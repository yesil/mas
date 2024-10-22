import { LitElement, css, html } from 'lit';

export class RteLinkEditor extends LitElement {
    static properties = {
        url: { type: String },
        text: { type: String },
        title: { type: String },
        target: { type: String },
    };

    static styles = css`
        :host {
            display: contents;
        }

        sp-textfield {
            width: 480px;
        }
    `;

    constructor() {
        super();
        this.url = '';
        this.text = '';
        this.title = '';
        this.target = '_self';
    }

    render() {
        return html`
            <sp-dialog size="l" @close=${this.#handleClose}>
                <h2 slot="heading">Insert Link</h2>
                <form id="linkForm" @submit=${this.#handleSubmit}>
                    <sp-field-label for="linkUrl">Link URL</sp-field-label>
                    <sp-textfield
                        id="linkUrl"
                        placeholder="https://"
                        .value=${this.url}
                        @input=${(e) => (this.url = e.target.value)}
                        required
                    ></sp-textfield>

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
                            <sp-menu-item value="_self"
                                >Same Window</sp-menu-item
                            >
                            <sp-menu-item value="_blank"
                                >New Window</sp-menu-item
                            >
                            <sp-menu-item value="_parent"
                                >Parent Frame</sp-menu-item
                            >
                            <sp-menu-item value="_top">Top Frame</sp-menu-item>
                        </sp-menu>
                    </sp-picker>
                </form>
                <sp-button
                    slot="button"
                    variant="secondary"
                    @click=${this.#handleClose}
                    type="button"
                    >Cancel</sp-button
                >
                <sp-button slot="button" variant="accent" type="submit"
                    >Insert Link</sp-button
                >
            </sp-dialog>
        `;
    }

    #handleSubmit(e) {
        e.preventDefault();

        const link = document.createElement('a');
        link.href = this.url;
        link.textContent = this.text;
        if (this.title) link.title = this.title;
        if (this.target) link.target = this.target;

        // Dispatch custom event with the link details
        this.dispatchEvent(
            new CustomEvent('link-created', {
                detail: {
                    element: link,
                    html: link.outerHTML,
                    attributes: {
                        href: this.url,
                        text: this.text,
                        title: this.title,
                        target: this.target,
                    },
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleClose() {
        this.dispatchEvent(
            new CustomEvent('close', { bubbles: true, composed: true }),
        );
    }
}

customElements.define('rte-link-editor', RteLinkEditor);
