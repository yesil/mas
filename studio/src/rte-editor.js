export class RteEditor extends HTMLElement {
    editor = null;

    connectedCallback() {
        this.addEventListener(
            'editor-action-click',
            this.handleEditorActionClick,
        );
        window.tinymce.init({
            target: this,
            toolbar: 'bold italic underline | link openlink unlink',
            plugins: 'link',
            license_key: 'gpl',
            promotion: false,
            extended_valid_elements: 'a[is|href|class],span[is|class]',
            content_style:
                '.price-strikethrough { text-decoration: line-through;}',
            setup: (editor) => {
                this.editor = editor;
                // Add focus event listener
                editor.on('focus', () => {
                    const focusEvent = new CustomEvent('focus', {
                        bubbles: true,
                        composed: true,
                        detail: { rte: this },
                    });
                    this.dispatchEvent(focusEvent);
                });
                editor.on('blur', (e) => {
                    // clean-up empty paragraphs
                    [...editor.contentDocument.querySelectorAll('p')].forEach(
                        (p) => {
                            if (p.innerText.trim() === '') p.remove();
                        },
                    );
                    const elements = [
                        ...editor.contentDocument.querySelectorAll(
                            'span[is="inline-price"],a[is="checkout-link"]',
                        ),
                    ];

                    // clean-up merch links
                    elements.forEach((el) => {
                        if (el.isInlinePrice) {
                            el.innerHTML = '';
                        }
                        if (el.isCheckoutLink) {
                            el.setAttribute('href', '');
                        }
                        el.removeAttribute('class');
                        el.removeAttribute('contenteditable');
                    });

                    removeComments(editor.contentDocument.body);
                    const value = editor.contentDocument.body.innerHTML;
                    elements.forEach((el) => {
                        el.setAttribute('contenteditable', 'false');
                        el.render?.();
                    });
                    const changeEvent = new CustomEvent('blur', {
                        bubbles: true,
                        composed: true,
                        detail: { value },
                    });
                    this.dispatchEvent(changeEvent);
                });

                // load mas in the RTE iframes
                editor.on('init', (e) => {
                    const masMinSource = window.__mas__lib;
                    if (!masMinSource) return;
                    const script =
                        editor.contentDocument.createElement('script');
                    script.src = masMinSource;
                    script.setAttribute('type', 'module');
                    editor.contentDocument.head.appendChild(script);
                    // TODO: remove this once the issue is fixed
                    const pandoraScript =
                        editor.contentDocument.createElement('script');
                    pandoraScript.innerHTML = 'window.process = { env: {} };';
                    editor.contentDocument.head.appendChild(pandoraScript);
                });

                // make merch links not editable
                editor.on('SetContent', (e) => {
                    [
                        ...editor.contentDocument.querySelectorAll(
                            'a[is],span[is]',
                        ),
                    ].forEach((el) => {
                        el.setAttribute('contenteditable', 'false');
                    });
                });
                // Add double-click event listener
                editor.on('dblclick', (e) => {
                    let target = e.target.parentNode;
                    target = target.parentNode;
                    if (target.classList.contains('placeholder-resolved')) {
                        const event = new CustomEvent('editor-action-click', {
                            bubbles: true,
                            composed: true,
                            detail: { clickedElement: target },
                        });
                        this.dispatchEvent(event);
                    }
                });
            },
        });
    }

    disconnectedCallback() {
        this.removeEventListener(
            'editor-action-click',
            this.handleEditorActionClick,
        );
    }

    appendContent(html) {
        if (this.editor) {
            this.editor.insertContent(html);
        }
    }
}

function removeComments(element) {
    // Create a TreeWalker to traverse all nodes
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_COMMENT,
        null,
        false,
    );

    // Collect comment nodes
    const commentNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
        commentNodes.push(currentNode);
    }

    // Remove collected comment nodes
    commentNodes.forEach((comment) => comment.parentNode.removeChild(comment));
}

customElements.define('rte-editor', RteEditor);
