import { html, css, LitElement, nothing } from 'lit';
import '../editors/variant-picker.js';
import { pushState, deeplink } from '../deeplink.js';
import { litObserver } from 'picosm';

class MasFilterToolbar extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        sp-picker {
            width: 100px;
        }

        sp-textfield {
            width: 200px;
        }

        .filters-badge {
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--spectrum-accent-color-1000);
            color: var(--spectrum-white);
            border-radius: 2px;
        }

        sp-search {
            --spectrum-search-border-radius: 16px;
        }
    `;

    static properties = {
        store: { type: Object, state: true },
    };

    constructor() {
        super();
        this.open = false;
    }

    get filterCount() {
        if (this.open)
            return html`<div slot="icon" class="filters-badge">0</div>`;
        return html`<sp-icon-filter-add slot="icon"></sp-icon-filter-add>`;
    }

    render() {
        if (!this.store) return nothing;
        return html`
            <sp-action-button
                toggles
                label="Filter"
                @click=${this.toggleFilterPanel}
                quiet
                emphasized
                >Filter ${this.filterCount}
            </sp-action-button>
            <div>
                <sp-search
                    placeholder="Search"
                    size="m"
                    @change="${this.handleSearch}"
                    @submit="${this.handleSearch}"
                    value=${this.store.searchText}
                    size="m"
                ></sp-search>
            </div>
        `;
    }

    handleSearch(e) {
        e.preventDefault();
        pushState({ query: e.target.value });
    }

    toggleFilterPanel() {
        this.open = !this.open;
        this.store.toggleFilterPanel(this.open);
    }
}

customElements.define(
    'mas-filter-toolbar',
    litObserver(MasFilterToolbar, ['store']),
);
