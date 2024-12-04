import { html, css, LitElement } from 'lit';

export class MasSurfacePicker extends LitElement {
    static properties = {
        value: { type: String },
        options: { type: Array },
    };

    constructor() {
        super();
        this.value = 'adobedotcom'; // Default selected value
        this.options = [
            { value: 'adobedotcom', label: 'Adobe.com' },
            { value: 'ccd', label: 'Creative Cloud Desktop' },
            { value: 'home', label: 'Adobe Home' },
        ];
    }

    static styles = css`
        :host {
            display: block;
            width: 200px;
        }

        sp-picker {
            width: 100%;
        }

        .icon {
            width: 24px;
            height: 24px;
        }

        /* Hide icons in the dropdown menu items */
        sp-menu::part(options) sp-menu-item::part(icon) {
            display: none;
        }
    `;

    handleChange(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('picker-change', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <sp-picker
                icons
                quiet
                @change=${this.handleChange}
                value=${this.value}
            >
                <!-- Menu items with icons -->
                ${this.options.map(
                    (option) => html`
                        <sp-menu-item value=${option.value}>
                            <svg
                                slot="icon"
                                class="icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 26"
                                aria-label="${option.label}"
                            >
                                <path
                                    fill="#292929"
                                    d="M19 0h11v26zM11.1 0H0v26zM15 9.6L22.1 26h-4.6l-2.1-5.2h-5.2z"
                                ></path>
                            </svg>
                            ${option.label}
                        </sp-menu-item>
                    `
                )}
            </sp-picker>
        `;
    }
}

customElements.define('mas-surface-picker', MasSurfacePicker);
