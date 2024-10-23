import { LitElement, css, html, nothing } from 'lit';

export class RteLinkEditor extends LitElement {
    static properties = {
        dialog: { type: Boolean },
        url: { type: String },
        text: { type: String },
        title: { type: String },
        target: { type: String },
        checkoutParameters: { type: String, attribute: 'checkout-parameters' },
    };

    static styles = css`
        :host {
            display: contents;
        }

        sp-underlay:not([open]) + sp-dialog {
            display: none;
        }

        sp-underlay + sp-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            background: var(--spectrum-gray-100);
        }

        sp-textfield {
            width: 480px;
        }
    `;

    constructor() {
        super();
        this.dialog = false;
        this.url = '';
        this.text = '';
        this.title = '';
        this.checkoutParameters = undefined;
        this.target = '_self';
    }

    get #checkoutParametersField() {
        if (this.checkoutParameters === undefined) return nothing;
        return html` <sp-field-label for="checkoutParameters"
                >Checkout Parameters</sp-field-label
            >
            <sp-textfield
                id="checkoutParameters"
                placeholder="Exrta checkout parameters: e.g: promoid=12345&mv=1"
                .value=${this.checkoutParameters}
                @input=${(e) => (this.checkoutParameters = e.target.value)}
            ></sp-textfield>`;
    }

    get #linkUrlField() {
        if (this.checkoutParameters !== undefined) return nothing;
        return html`
            <sp-field-label for="linkUrl">Link URL</sp-field-label>
            <sp-textfield
                id="linkUrl"
                placeholder="https://"
                .value=${this.url}
                @input=${(e) => (this.url = e.target.value)}
                required
            ></sp-textfield>
        `;
    }

    get #editor() {
        return html`<sp-dialog size="l" @close=${this.#handleClose}>
            <h2 slot="heading">Insert/Edit Link</h2>
            ${this.#linkUrlField} ${this.#checkoutParametersField}
            <sp-field-label for="linkText">Link Text</sp-field-label>
            <sp-textfield
                id="linkText"
                placeholder="Display text"
                .value=${this.text}
                @input=${(e) => (this.text = e.target.value)}
                required
            ></sp-textfield>

            <sp-field-label for="linkTitle">Title</sp-field-label>
            <sp-textfield
                id="linkTitle"
                placeholder="Hover text"
                .value=${this.title}
                @input=${(e) => (this.title = e.target.value)}
            ></sp-textfield>

            <sp-field-label for="linkTarget">Target</sp-field-label>
            <sp-picker
                id="linkTarget"
                .value=${this.target}
                @change=${(e) => (this.target = e.target.value)}
            >
                <sp-menu>
                    <sp-menu-item value="_self">Same Window</sp-menu-item>
                    <sp-menu-item value="_blank">New Window</sp-menu-item>
                    <sp-menu-item value="_parent">Parent Frame</sp-menu-item>
                    <sp-menu-item value="_top">Top Frame</sp-menu-item>
                </sp-menu>
            </sp-picker>
            <sp-button
                slot="button"
                variant="secondary"
                @click=${this.#handleClose}
                type="button"
                >Cancel</sp-button
            >
            <sp-button
                id="saveButton"
                slot="button"
                variant="accent"
                @click=${this.#handleSave}
                >Save</sp-button
            >
        </sp-dialog>`;
    }

    get #asDialog() {
        return html`
            <sp-underlay open></sp-underlay>
            ${this.#editor}
        `;
    }

    render() {
        if (this.dialog) return this.#asDialog;
        return this.#editor;
    }

    #handleSave(e) {
        e.preventDefault();
        const data = {
            url: this.url,
            text: this.text,
            title: this.title,
            target: this.target,
            checkoutParameters: this.checkoutParameters,
        };
        this.dispatchEvent(
            new CustomEvent('save', {
                bubbles: true,
                composed: true,
                detail: data,
            }),
        );
        this.#handleClose();
    }

    #handleClose() {
        this.open = false;
        this.dispatchEvent(
            new CustomEvent('close', { bubbles: true, composed: true }),
        );
    }
}

customElements.define('rte-link-editor', RteLinkEditor);
