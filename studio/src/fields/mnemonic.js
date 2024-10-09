import { html, LitElement } from 'lit';

class MnemonicField extends LitElement {
    static get properties() {
        return {
            icon: { type: String },
            alt: { type: String },
            link: { type: String },
        };
    }

    render() {
        html`
            <sp-field-label for="icon">Name</sp-field-label>
            <sp-textfield id="icon" placeholder="Enter icon URL" value="${this.icon}"></sp-textfield>
            <sp-field-label for="alt">Alt text</sp-field-label>
            <sp-textfield id="alt" placeholder="enter alt text" value="${this.alt}"></sp-textfield>
            <sp-field-label for="url">Link</sp-field-label>
            <sp-textfield id="url" placeholder="Enter target link" value="${this.link}"></sp-textfield
        `;
    }
}

customElements.define('mas-mnemonic-field', MnemonicField);
