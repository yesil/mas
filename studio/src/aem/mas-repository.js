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

class MasRepository {
    status = 'idle';
    inSelection = false;
    searchText = '';
    topFolder = 'ccd';
    topFolders = [];
    showFilterPanel = false;

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

    constructor({
        bucket = null,
        baseUrl = null,
        path = null,
        tags = [],
    } = {}) {
        if (!(bucket || baseUrl)) {
            throw new Error('Either the bucket or baseUrl is required.');
        }
        this.bucket = bucket;
        this.baseUrl = baseUrl;
        this.path = path;
        this.#aem = new AEM(this.bucket, this.baseUrl);
        this.initTopFolders();
        this.initReactions();
    }

    initReactions() {
        reaction(
            this,
            ({ searchText, path, tags }) => {
                return [searchText, path, tags];
            },
            () => this.searchFragments(),
            100,
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
            fragmentData.path.indexOf(getDamPath(this.path)) === 0
        ) {
            const fragment = new Fragment(fragmentData, this);
            this.#searchResult = [fragment];
            await this.addToCache([fragment]);
        }
        this.setStatus('loaded');
    }

    isFragmentId(str) {
        return this.isUUID(str);
    }

    async searchFragments() {
        console.log('searching', this.path, this.searchText, this.tags);
        this.#search = {
            path: getDamPath(this.path),
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

    // allows to notify repository observers
    toggleFragmentSelection(fragment) {
        fragment.toggleSelection();
    }

    setTags(value) {
        this.tags = value;
    }

    setFragment(fragment) {
        this.fragment?.discardChanges();
        this.fragment = fragment;
    }

    setTopFolders(folders) {
        this.topFolders = folders;
    }

    setPath(path) {
        this.path = path;
    }

    setSearchText(value) {
        this.searchText = value;
    }

    toggleSelectionMode(force) {
        this.inSelection = force ?? !this.inSelection;
        if (!this.inSelection) {
            this.clearSelection();
        }
    }

    toggleFilterPanel() {
        this.showFilterPanel = !this.showFilterPanel;
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

    get selectionCount() {
        return this.selectedFragments.length;
    }
}

const MasRepositoryObservable = makeObservable(
    MasRepository,
    [
        'clearSelection',
        'setFragment',
        'setStatus',
        'setPath',
        'setSearchText',
        'setTags',
        'toggleSelectionMode',
        'toggleFragmentSelection',
        'toggleFilterPanel',
    ],
    ['selectedFragments', 'fragments'],
);

export { MasRepositoryObservable as MasRepository, getDamPath };
