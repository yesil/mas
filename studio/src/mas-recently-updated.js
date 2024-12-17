import { html, LitElement, nothing } from 'lit';

import { Fragment } from './aem/fragment.js';
import { AEM } from './aem/aem.js';
import { litObserver } from 'picosm';

class MasRecentlyUpdated extends LitElement {
    static get properties() {
        return {
            repository: { type: Object, state: true },
        };
    }

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.renderItem = this.renderItem.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.repository.loadRecentlyUpdatedFragments();
    }

    handleClick(e) {
        clearTimeout(this.tooltipTimeout);
        const currentTarget = e.currentTarget;
        this.tooltipTimeout = setTimeout(() => {
            currentTarget.classList.add('has-tooltip');
        }, 500);
    }

    handleMouseLeave(e) {
        clearTimeout(this.tooltipTimeout);
        e.currentTarget.classList.remove('has-tooltip');
    }

    handleDoubleClick(e, fragment) {
        clearTimeout(this.tooltipTimeout);
        e.currentTarget.classList.remove('has-tooltip');
        this.repository.selectFragment(e.clientX, fragment);
    }

    renderItem(fragment) {
        return html`<merch-card
            @click="${this.handleClick}"
            @mouseleave="${this.handleMouseLeave}"
            @dblclick="${(e) => this.handleDoubleClick(e, fragment)}"
        >
            <aem-fragment fragment="${fragment.id}" ims author></aem-fragment>
        </merch-card>`;
    }

    render() {
        if (!this.repository.recentlyUpdatedfragments) return;
        return html` <h2>Recently Updated</h2>
            <div class="container">
                ${this.repository.recentlyUpdatedfragments.map(this.renderItem)}
            </div>`;
    }
}

customElements.define(
    'mas-recently-updated',
    litObserver(MasRecentlyUpdated, ['repository']),
);
