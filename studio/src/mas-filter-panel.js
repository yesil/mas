import { html, css, LitElement } from 'lit';

class MasFilterPanel extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 10px;
            background-color: var(--spectrum-global-color-gray-50);
        }
        sp-picker {
            width: 150px;
        }
    `;

    render() {
        return html`
            <sp-picker label="Offer Type" selected="None">
                <sp-menu-item>None</sp-menu-item>
                <sp-menu-item>Free</sp-menu-item>
                <sp-menu-item>Discounted</sp-menu-item>
                <sp-menu-item>Full Price</sp-menu-item>
            </sp-picker>

            <sp-picker label="Plan Type">
                <sp-menu-item>Monthly</sp-menu-item>
                <sp-menu-item>Annual</sp-menu-item>
                <sp-menu-item>Lifetime</sp-menu-item>
            </sp-picker>

            <sp-picker label="Country">
                <sp-menu-item>United States</sp-menu-item>
                <sp-menu-item>United Kingdom</sp-menu-item>
                <sp-menu-item>Canada</sp-menu-item>
                <sp-menu-item>Australia</sp-menu-item>
            </sp-picker>

            <sp-picker label="Market Segment">
                <sp-menu-item>Individual</sp-menu-item>
                <sp-menu-item>Small Business</sp-menu-item>
                <sp-menu-item>Enterprise</sp-menu-item>
            </sp-picker>
        `;
    }
}

customElements.define('mas-filter-panel', MasFilterPanel);
