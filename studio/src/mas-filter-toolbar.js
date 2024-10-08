import { html, css, LitElement } from 'lit';

class MasFilterToolbar extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 10px;
            background-color: var(--spectrum-global-color-gray-100);
        }
        sp-textfield {
            width: 200px;
        }
    `;

    render() {
        return html`
            <sp-action-button label="Individual" selected
                >Individual</sp-action-button
            >
            <sp-action-button label="Student">Student</sp-action-button>
            <sp-action-button label="Business">Business</sp-action-button>

            <sp-button label="Filter" variant="primary">Filter</sp-button>

            <sp-picker label="Sort">
                <sp-menu-item>Sort by Relevance</sp-menu-item>
                <sp-menu-item>Sort by Price</sp-menu-item>
                <sp-menu-item>Sort by Popularity</sp-menu-item>
            </sp-picker>

            <sp-textfield placeholder="Search"></sp-textfield>
        `;
    }
}

customElements.define('mas-filter-toolbar', MasFilterToolbar);
