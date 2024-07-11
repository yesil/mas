export class RteEditor extends HTMLElement {
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
        });
    }
}

customElements.define('rte-editor', RteEditor);
