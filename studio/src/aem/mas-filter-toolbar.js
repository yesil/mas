import { html, css, LitElement } from 'lit';
import '../editors/variant-picker.js';
import { pushState, deeplink } from '../deeplink.js';

class MasFilterToolbar extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 10px;
            align-self: flex-end;
        }
        sp-picker {
            width: 100px;
        }
        sp-textfield {
            width: 200px;
        }
    `;

    static properties = {
        repository: { type: Object, state: true },
        variant: { type: String, state: true },
    };

    render() {
        return html`
            <sp-action-button
                toggles
                label="Filter"
                @click=${() => this.repository.toggleFilterPanel()}
                >Filter</sp-action-button
            >
            <sp-picker label="Sort" disabled>
                <sp-menu-item>Ascending</sp-menu-item>
                <sp-menu-item>Descending</sp-menu-item>
            </sp-picker>
            <div>
                <sp-search
                    placeholder="Search"
                    @change="${this.handleSearch}"
                    @submit="${this.handleSearch}"
                    value=${this.repository.searchText}
                    size="m"
                ></sp-search>
                <variant-picker
                    id="vpick"
                    show-all="true"
                    default-value="${this.variant}"
                    disabled
                    @change="${this.handleVariantChange}"
                ></variant-picker>
            </div>
            <sp-button @click=${this.doSearch}>Search</sp-button>
        `;
    }

    handleSearch(e) {
        e.preventDefault();
        this.searchText = e.target.value;
        pushState({ query: this.searchText });
    }

    handleVariantChange(e) {
        this.variant = e.target.value;
        pushState({ variant: this.variant });
    }

    doSearch() {
        this.dispatchEvent(
            new CustomEvent('search-fragments', {
                bubbles: true,
                composed: true,
            }),
        );
    }
}

customElements.define('mas-filter-toolbar', MasFilterToolbar);
