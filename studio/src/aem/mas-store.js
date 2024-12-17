import { makeObservable, notify, reaction } from 'picosm';
import { filterByTags, AEM } from './aem.js';
import { Fragment } from './fragment.js';

let aemFragmentCache;

const ROOT = '/content/dam/mas';

const status = {
    idle: 'idle',
    loading: 'loading',
    updated: 'updated',
    copied: 'copied',
    published: 'published',
    deleted: 'deleted',
    error: 'error',
};

const getDamPath = (path) => {
    if (!path) return ROOT;
    if (path.startsWith(ROOT)) return path;
    return ROOT + '/' + path;
};

class MasStore {
    status = 'idle';
    inSelection = false;
    searchText = '';
    showSplash = true;
    topFolder = null;
    topFolders = [];
    showFilterPanel = false;
    recentlyUpdatedfragments = [];

    setStatus(value) {
        this.status = value;
    }

    // Private fields
    #aem;
    #currentFragments = [];
    #cursor = null;
    #search = {};
    #searchResult = [];
    tags = [];
    fragmentPositionX = 0;

    constructor({ bucket = null, baseUrl = null, path = null } = {}) {
        if (!(bucket || baseUrl)) {
            throw new Error('Either the bucket or baseUrl is required.');
        }
        this.bucket = bucket;
        this.baseUrl = baseUrl;
        this.#aem = new AEM(this.bucket, this.baseUrl);
        this.initTopFolders();
        this.initReactions();
    }

    initReactions() {
        // search
        reaction(
            this,
            ({ searchText, topFolder, tags }) => {
                return [searchText, topFolder, tags];
            },
            () => this.searchFragments(),
            100,
        );

        // splash screen
        reaction(
            this,
            ({ showSplash, topFolder }) => {
                if (!showSplash) return [];
                return [topFolder];
            },
            () => this.loadRecentlyUpdatedFragments(),
        );
    }

    async initTopFolders() {
        this.setStatus(status.loading);
        const { children } = await this.#aem.folders.list(ROOT);
        const ignore = window.localStorage.getItem('ignore_folders') || [
            'images',
        ];
        this.setTopFolders(
            children
                .map((folder) => folder.name)
                .filter((child) => !ignore.includes(child)),
        );
        this.setStatus(status.idle);
    }

    async addToCache(fragments) {
        if (!aemFragmentCache) {
            // If you are not using custom elements at all,
            // you should remove or replace this logic.
            await customElements.whenDefined('aem-fragment');
            const fragEl = document.createElement('aem-fragment');
            aemFragmentCache = fragEl.cache;
        }
        aemFragmentCache.add(...fragments);
    }

    async processFragments(cursor, search = false) {
        if (this.#cursor) {
            this.#cursor.cancelled = true;
        }
        this.#cursor = cursor;
        this.setStatus(status.loading);
        this.#searchResult = [];
        this.#currentFragments = [];

        for await (const result of cursor) {
            if (cursor.cancelled) break;
            const fragments = result.map((item) => new Fragment(item, this));
            if (search) {
                this.#searchResult = [...this.#searchResult, ...fragments];
            } else {
                this.#currentFragments.push(...fragments);
            }
            await this.addToCache(fragments);
        }

        this.setStatus('loaded');
    }

    isUUID(str) {
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(str);
    }

    async searchFragmentByUUID() {
        this.setStatus(status.loading);
        this.#cursor = null;
        this.#searchResult = [];
        let fragmentData = await this.#aem.sites.cf.fragments.getById(
            this.searchText,
        );
        if (this.tags) {
            if (!filterByTags(this.tags)(fragmentData)) {
                fragmentData = null;
            }
        }
        if (
            fragmentData &&
            fragmentData.path.indexOf(getDamPath(this.topFolder)) === 0
        ) {
            const fragment = new Fragment(fragmentData, this);
            this.#searchResult = [fragment];
            await this.addToCache([fragment]);
        }
        this.setStatus(status.idle);
    }

    isFragmentId(str) {
        return this.isUUID(str);
    }

    async searchFragments() {
        this.setStatus(status.loading);
        console.log('searching', this.topFolder, this.searchText, this.tags);
        this.#search = {
            path: getDamPath(this.topFolder),
        };

        let isSearching = false;
        if (this.searchText) {
            this.#search.query = this.searchText;
            isSearching = true;
        }

        if (this.tags && this.tags.length > 0) {
            this.#search.tags = this.tags;
        }

        if (this.isFragmentId(this.searchText)) {
            await this.searchFragmentByUUID();
        } else {
            const cursor = await this.#aem.sites.cf.fragments.search(
                this.#search,
            );
            await this.processFragments(cursor, isSearching);
        }
        this.setStatus(status.idle);
    }

    async saveFragment() {
        this.setStatus(status.loading);
        let fragment = await this.#aem.sites.cf.fragments.save(this.fragment);
        if (!fragment) {
            this.setStatus('error');
            throw new Error('Failed to save fragment');
        }
        aemFragmentCache.get(fragment.id)?.refreshFrom(fragment, true);
        this.setStatus('updated');
    }

    async copyFragment() {
        this.setStatus(status.loading);
        const oldFragment = this.fragment;
        const fragment = await this.#aem.sites.cf.fragments.copy(oldFragment);
        const newFragment = new Fragment(fragment, this);
        aemFragmentCache?.add(newFragment);

        if (this.searchText) {
            this.#searchResult.push(newFragment);
        } else {
            this.#currentFragments?.push(newFragment);
        }
        this.setFragment(newFragment);
        this.setStatus('copied');
    }

    async publishFragment() {
        this.setStatus(status.loading);
        await this.#aem.sites.cf.fragments.publish(this.fragment);
        this.setStatus('published');
    }

    async deleteFragment() {
        this.setStatus(status.loading);
        await this.#aem.sites.cf.fragments.delete(this.fragment);
        if (this.searchText) {
            const fragmentIndex = this.#searchResult.indexOf(this.fragment);
            if (fragmentIndex !== -1) {
                this.#searchResult.splice(fragmentIndex, 1);
            }
        } else {
            this.#currentFragments = this.#currentFragments.filter(
                (f) => f.id !== this.fragment.id,
            );
        }
        this.setFragment(null);
        this.setStatus('deleted');
    }

    async selectFragment(x, fragment) {
        this.setStatus(status.loading);
        this.fragmentPositionX = x;
        this.setStatus(status.loading);
        const latest = await this.#aem.sites.cf.fragments.getById(fragment.id);
        Object.assign(fragment, latest);
        fragment.refreshFrom(latest);
        this.setFragment(fragment);
        this.setStatus(status.idle);
    }

    async loadRecentlyUpdatedFragments() {
        this.recentlyUpdatedfragments = [];
        this.setStatus(status.loading);
        const cursor = await this.#aem.sites.cf.fragments.search(
            {
                sort: [{ on: 'modifiedOrCreated', order: 'DESC' }],
                path: `/content/dam/mas/${this.topFolder}`,
                // tags: ['mas:status/DEMO']
            },
            6,
        );
        const result = await cursor.next();
        const fragments = result.value.map((item) => new Fragment(item, this));
        await this.addToCache(fragments);
        this.recentlyUpdatedfragments.push(...fragments);
        this.setStatus(status.idle);
    }

    unselectFragment() {
        if (this.fragment) {
            this.fragment.discardChanges();
            notify(this.fragment, 'discard');
        }
        this.setFragment(null);
    }

    clearSelection() {
        this.fragments.forEach((fragment) => fragment.toggleSelection(false));
    }

    // allows to notify store observers
    toggleFragmentSelection(fragment) {
        fragment.toggleSelection();
    }

    setTags(value) {
        if (values.length === 0 && this.tags.length === 0) return;
        this.tags = value;
    }

    setFragment(fragment) {
        this.fragment?.discardChanges();
        this.fragment = fragment;
    }

    setTopFolder(folder) {
        this.topFolder = folder || 'ccd';
    }

    setTopFolders(folders) {
        this.topFolders = folders;
    }

    setSearchText(value) {
        this.searchText = value;
    }

    setShowSplash(value) {
        this.showSplash = value;
    }

    toggleSelectionMode(force) {
        this.inSelection = force ?? !this.inSelection;
        if (!this.inSelection) {
            this.clearSelection();
        }
    }

    toggleFilterPanel(value) {
        this.showFilterPanel = value ?? !this.showFilterPanel;
    }

    get fragments() {
        return (
            (this.searchText ? this.#searchResult : this.#currentFragments) ??
            []
        );
    }

    get selectedFragments() {
        return this.fragments.filter((fragment) => fragment.selected);
    }

    get selectedFragmentsIds() {
        return this.selectedFragments.map((fragment) => fragment.id);
    }

    get selectionCount() {
        return this.selectedFragments.length;
    }
}

const MasStoreObservable = makeObservable(
    MasStore,
    [
        'clearSelection',
        'setFragment',
        'setSearchText',
        'setShowSplash',
        'setStatus',
        'setTags',
        'setTopFolder',
        'toggleFilterPanel',
        'toggleFragmentSelection',
        'toggleSelectionMode',
    ],
    ['selectedFragments', 'selectedFragmentsIds', 'fragments'],
);

export { MasStoreObservable as MasStore };
