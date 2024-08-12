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

    /**
     * @param {FocusEvent} fragment
     */
    async selectFragment(fragment) {
        this.aem.sites.cf.fragments.getCfById(fragment.id).then((fragment) => {
            merchDataSourceCache?.add(fragment);
            this.fragment = new Fragment(fragment);
        });
    }

    saveFragment() {
        this.aem.sites.cf.fragments.save(this.fragment).then((fragment) => {
            merchDataSourceCache?.add(fragment);
            this.fragment = new Fragment(fragment);
        });
    }
}
