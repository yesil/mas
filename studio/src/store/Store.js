import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { Search } from './Search.js';

import { AEM } from '@adobecom/milo/libs/features/mas/web-components/src/aem.js';
import { Fragment } from './Fragment.js';

/**
 * Reference to single
 */
let merchDataSourceCache;

export class Store {
    /**
     * @type {Search}
     */
    search = new Search();
    /**
     * @type {import('@adobecom/milo/libs/features/mas/web-components/src').AEM}
     */
    aem;

    /**
     * Selected fragment
     * @type {Fragment}
     */
    fragment;

    loading = false;

    /**
     * @param {string} bucket
     */
    constructor(bucket) {
        if (!bucket) throw new Error('bucket is required'); // TODO provide better error message.
        makeAutoObservable(this, {
            aem: false,
        });
        this.aem = new AEM(bucket);
        merchDataSourceCache = document.createElement('merch-datasource').cache;
    }

    async doSearch(props) {
        this.search.update(props);
        const fragments = await this.aem.sites.cf.fragments
            .search(this.search)
            .then((items) => {
                return items.map((item) => new Fragment(item));
            });
        merchDataSourceCache?.add(...fragments);
        this.search.setResult(fragments);
    }

    setFragment(fragment) {
        this.fragment?.unselect();
        fragment?.select();
        this.fragment = fragment;
    }

    /**
     * @param {FocusEvent} fragment
     */
    async selectFragment(fragment) {
        if (!fragment) {
            this.setFragment(null);
            return;
        }
        this.loading = true;
        let newFragment;
        if (fragment.id) {
            newFragment = await this.aem.sites.cf.fragments.getCfById(
                fragment.id,
            );
        }
        if (!newFragment) return;
        Object.apply(fragment, newFragment);
        this.setFragment(fragment);
        this.loading = false;
    }

    async saveFragment() {
        let fragment = await this.aem.sites.cf.fragments.save(this.fragment);
        if (!fragment) throw new Error('Failed to save fragment');
        fragment = new Fragment(fragment);
        merchDataSourceCache?.add(fragment);
        this.setFragment(fragment);
    }

    async copyFragment() {
        const fragment = await this.aem.sites.cf.fragments.copyFragment(
            this.fragment,
        );
        merchDataSourceCache?.add(fragment);
        const newFragment = new Fragment(fragment);
        this.search.addToResult(newFragment, this.fragment);
        this.setFragment(newFragment);
    }
}
