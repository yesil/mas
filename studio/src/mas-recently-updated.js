import { html, LitElement, nothing } from 'lit';

import { litObserver } from 'picosm';

class MasRecentlyUpdated extends LitElement {
    static get properties() {
        return {
            store: { type: Object, state: true },
        };
    }

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(fragment) {
        return html`<render-view-item
            .store=${this.store}
            .fragment=${fragment}
        ></render-view-item>`;
    }

    render() {
        if (!this.store.recentlyUpdatedfragments) return;
        return html` <h2>Recently Updated</h2>
            <div class="container">
                ${this.store.recentlyUpdatedfragments.map(this.renderItem)}
            </div>`;
    }
}

customElements.define(
    'mas-recently-updated',
    litObserver(MasRecentlyUpdated, ['store']),
);
