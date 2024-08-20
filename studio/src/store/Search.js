import { makeAutoObservable } from 'mobx';
import { Fragment } from './Fragment.js';

export class Search {
    /** @type {string|undefined} Search query (the text the user entered) */
    query;

    /** @type {string|undefined} Path of the request (e.g., the URL on a website) */
    path;

    /** @type {string|undefined} Locale */
    locale;

    /** @type {string|undefined} Content Fragment variant, e.g: merch-card */
    variant;

    /** @type {string|undefined} Content Fragment Model ID */
    modelId;

    /** @type {boolean|undefined} Whether the Content Fragment is published */
    published;

    /**
     * @type {Array<Fragment>}
     */
    result = [];

    constructor() {
        makeAutoObservable(this);
    }

    /**
     *
     * @param {Array<Fragment>} result
     */
    setResult(result) {
        this.result = result;
    }

    /**
     * Add a new fragment to the result.
     * Happens when a fragment is copied.
     * @param {Fragment} fragment
     * @param {Fragment} after
     */
    addToResult(fragment, after) {
        const index = this.result.indexOf(after);
        this.result.splice(index + 1, 0, fragment);
    }

    update(props) {
        Object.assign(this, props);
    }
}
