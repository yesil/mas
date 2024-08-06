export class RteEditor extends HTMLElement {
    constructor() {
        super();
        this.editor = null;
    }

    get value() {
        return this.editor.getContent();
    }

    connectedCallback() {
        window.tinymce.init({
            target: this,
            toolbar: 'bold italic underline | link openlink unlink',
            plugins: 'link',
            license_key: 'gpl',
            extended_valid_elements: 'a[is|href|class],span[is|class]',
            noneditable_class: 'placeholder-resolved',
            content_style:
                '.price-strikethrough { text-decoration: line-through;}',
            setup: (editor) => {
                this.editor = editor;
                editor.on('blur', () => this.handleBlur());
            },
        });
    }

    handleBlur() {
        const content = this.editor.getContent();
        const changeEvent = new CustomEvent('blur', {
            bubbles: true,
            composed: true,
            detail: { content },
        });
        this.dispatchEvent(changeEvent);
    }
}

customElements.define('rte-editor', RteEditor);
