import { LitElement, css, html, nothing } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';

export class RteLinkEditor extends LitElement {
    static properties = {
        dialog: { type: Boolean },
        url: { type: String },
        text: { type: String },
        title: { type: String },
        target: { type: String },
        variant: { type: String },
        checkoutParameters: {
            type: String,
            attribute: 'checkout-parameters',
            reflect: true,
        },
    };

    static styles = css`
        :host {
            display: block;
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

        sp-dialog {
            width: 100%;
            max-width: 750px;
        }

        sp-dialog {
            width: 100%;
            max-width: 600px;
        }

        :host([checkout-parameters]) sp-dialog {
            max-width: 770px;
        }

        sp-textfield {
            width: 480px;
        }

        sp-link {
            display: inline-flex;
            align-items: center;
            border-radius: 16px;
            padding: 0 4px;
        }

        sp-button.selected,
        sp-link.selected {
            outline: 2px dashed var(--spectrum-global-color-blue-700);
            outline-offset: 2px;
        }
    `;

    constructor() {
        super();
        this.dialog = false;
        this.url = '';
        this.text = '';
        this.title = '';
        this.checkoutParameters = undefined;
        this.variant = 'accent';
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

    get checkoutParametersElement() {
        return this.shadowRoot.querySelector('#checkoutParameters');
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
                @change=${() => (this.text = this.text || this.url)}
            ></sp-textfield>
        `;
    }

    get linkUrlElement() {
        return this.shadowRoot.querySelector('#linkUrl');
    }

    get #linkVariants() {
        if (this.checkoutParameters === undefined) return nothing;
        return html`
            <sp-field-label for="linkVariant">Variant</sp-field-label>
            <sp-button-group id="linkVariant">
                <sp-button
                    class=${classMap({ selected: this.variant === 'accent' })}
                    @click=${() => (this.variant = 'accent')}
                    variant="accent"
                    >Accent</sp-button
                >
                <sp-button
                    @click=${() => (this.variant = 'primary-outline')}
                    class=${classMap({
                        selected: this.variant === 'primary-outline',
                    })}
                    treatment="outline"
                    variant="primary"
                    >Primary outline</sp-button
                >
                <sp-button
                    class=${classMap({
                        selected: this.variant === 'secondary',
                    })}
                    @click=${() => (this.variant = 'secondary')}
                    variant="secondary"
                    >Secondary</sp-button
                >
                <sp-button
                    @click=${() => (this.variant = 'secondary-outline')}
                    class=${classMap({
                        selected: this.variant === 'secondary-outline',
                    })}
                    treatment="outline"
                    variant="secondary"
                    >Secondary outline</sp-button
                >
                <sp-link
                    class=${classMap({
                        selected: this.variant === 'primary-link',
                    })}
                    @click=${(e) => {
                        e.preventDefault();
                        this.variant = 'primary-link';
                    }}
                    href="#"
                    >Primary link</sp-link
                >

                <sp-link
                    class=${classMap({
                        selected: this.variant === 'secondary-link',
                    })}
                    @click=${(e) => {
                        e.preventDefault();
                        this.variant = 'secondary-link';
                    }}
                    href="#"
                    variant="secondary"
                    >Secondary link</sp-link
                >
            </sp-button-group>
        `;
    }

    get linkTitleElement() {
        return this.shadowRoot.querySelector('#linkTitle');
    }

    get linkTextElement() {
        return this.shadowRoot.querySelector('#linkText');
    }

    get linkTargetElement() {
        return this.shadowRoot.querySelector('#linkTarget');
    }

    get #editor() {
        const type =
            this.checkoutParameters === undefined ? 'Link' : 'Checkout Link';
        return html`<sp-dialog close=${this.#handleClose}>
            <h2 slot="heading">Insert/Edit ${type}</h2>
            ${this.#linkUrlField} ${this.#checkoutParametersField}
            <sp-field-label for="linkText">Link Text</sp-field-label>
            <sp-textfield
                id="linkText"
                placeholder="Display text"
                .value=${this.text}
                @input=${(e) => (this.text = e.target.value)}
            ></sp-textfield>

            <sp-field-label for="linkTitle">Title</sp-field-label>
            <sp-textfield
                id="linkTitle"
                placeholder="link title"
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
            ${this.#linkVariants}
            <sp-button
                slot="button"
                variant="secondary"
                treatment="outline"
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
        };
        if (this.checkoutParameters !== undefined) {
            delete data.url;
            Object.assign(data, {
                variant: this.variant,
                checkoutParameters: this.checkoutParameters,
            });
        }
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
