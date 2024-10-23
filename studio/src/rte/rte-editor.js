import { LitElement, html, css, nothing } from 'lit';
import { EditorState } from 'prosemirror-state';
import { Schema, DOMParser, DOMSerializer } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';

class RteEditor extends LitElement {
    static properties = {
        readOnly: { type: Boolean, attribute: 'readonly' },
        inlinePrice: { type: Boolean, attribute: 'inline-price' },
        checkoutLink: { type: Boolean, attribute: 'checkout-link' },
        ost: { type: Boolean, attribute: 'ost' },
        showLinkEditor: { type: Boolean, state: true },
        showOfferSelectorTool: { type: Boolean, state: true },
    };

    static styles = css`
        :host {
            display: flex;
            gap: 8px;
            flex-direction: column;
            font-size: var(--spectrum-font-size-200);
        }

        :host > div {
            outline: 1px dashed #ccc;
            padding: 8px;
            min-height: 48px;
            flex: 1;
        }
    `;

    #editorSchema;

    constructor() {
        super();
        this.readOnly = false;
        this.editorView = null;
        this.inlinePrice = false;
        this.checkoutLink = false;
        this.ost = false;
        this.showLinkEditor = false;
        this.showOfferSelectorTool = false;
    }

    initEditorSchema() {
        const nodes = {
            text: {
                group: 'inline',
            },
            span: {
                group: 'inline',
                inline: true,
                content: 'inline*',
                attrs: {
                    class: { default: null },
                    style: { default: null },
                },
                parseDOM: [
                    {
                        tag: 'span:not([is])',
                        getAttrs(dom) {
                            return {
                                class: dom.getAttribute('class'),
                                style: dom.getAttribute('style'),
                            };
                        },
                    },
                ],
                toDOM(node) {
                    const attrs = {};
                    if (node.attrs.class) attrs.class = node.attrs.class;
                    if (node.attrs.style) attrs.style = node.attrs.style;
                    return ['span', attrs, 0];
                },
            },
            paragraph: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'p' }],
                toDOM() {
                    return ['p', 0];
                },
            },
            doc: {
                content: 'block+',
            },
        };

        if (this.inlinePrice) {
            nodes.inlinePrice = {
                group: 'inline',
                inline: true,
                atom: true,
                attrs: {
                    dataset: { default: {} },
                },
                parseDOM: [
                    {
                        tag: 'span[is="inline-price"]',
                        getAttrs(dom) {
                            // Collect all data attributes
                            const dataset = {};
                            Object.keys(dom.dataset).forEach((key) => {
                                dataset[key] = dom.dataset[key];
                            });
                            return { dataset };
                        },
                    },
                ],
                toDOM(node) {
                    const inlinePrice = document.createElement('span', {
                        is: 'inline-price',
                    });
                    Object.entries(node.attrs.dataset || {}).forEach(
                        ([key, value]) => {
                            inlinePrice.dataset[key] = value;
                        },
                    );
                    return inlinePrice;
                },
            };
        }

        if (this.checkoutLink) {
            nodes.checkoutLink = {
                group: 'inline',
                content: 'inline+',
                inline: true,
                atom: true,
                attrs: {
                    dataset: { default: {} },
                },
                parseDOM: [
                    {
                        tag: 'a[is="checkout-link"]',
                        getAttrs(dom) {
                            // Collect all data attributes
                            const dataset = {};
                            Object.keys(dom.dataset).forEach((key) => {
                                dataset[key] = dom.dataset[key];
                            });
                            return { dataset };
                        },
                    },
                ],
                toDOM(node) {
                    const { text = '' } = node.content?.content?.[0];
                    const checkoutLink = document.createElement('a', {
                        is: 'checkout-link',
                    });
                    checkoutLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    checkoutLink.innerText = text;
                    Object.entries(node.attrs.dataset || {}).forEach(
                        ([key, value]) => {
                            checkoutLink.dataset[key] = value;
                        },
                    );
                    return checkoutLink;
                },
            };
        }

        this.#editorSchema = new Schema({
            nodes,
            marks: {
                strong: {
                    parseDOM: [
                        { tag: 'strong' },
                        { tag: 'b' },
                        {
                            style: 'font-weight',
                            getAttrs: (value) =>
                                value === 'bold' || value === '700',
                        },
                    ],
                    toDOM() {
                        return ['strong', 0];
                    },
                },
                em: {
                    parseDOM: [
                        { tag: 'i' },
                        { tag: 'em' },
                        { style: 'font-style=italic' },
                    ],
                    toDOM() {
                        return ['em', 0];
                    },
                },
                strikethrough: {
                    parseDOM: [{ tag: 's' }],
                    toDOM() {
                        return ['s', 0];
                    },
                },
                underline: {
                    parseDOM: [{ tag: 'u' }],
                    toDOM() {
                        return ['u', 0];
                    },
                },
                link: {
                    attrs: {
                        href: { default: '' },
                        title: { default: null },
                    },
                    inclusive: false,
                    parseDOM: [
                        {
                            tag: 'a[href]',
                            getAttrs(dom) {
                                return {
                                    href: dom.getAttribute('href'),
                                    title: dom.getAttribute('title'),
                                };
                            },
                        },
                    ],
                    toDOM(node) {
                        const { href, title } = node.attrs;
                        return [
                            'a',
                            { href, title, rel: 'noopener noreferrer' },
                            0,
                        ];
                    },
                },
            },
        });
    }

    firstUpdated() {
        this.initEditorSchema();
        this.initializeEditor();
        this.value = this.innerHTML;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this.#handleEscKey);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this.#handleEscKey);
        if (this.editorView) {
            this.editorView.destroy();
        }
    }

    #handleEscKey(event) {
        if (event.key === 'Escape') {
            this.showLinkEditor = false;
            this.showOfferSelectorTool = false;
        }
    }

    createEditorState() {
        const editorSchema = this.#editorSchema;
        const doc = editorSchema.node('doc', null, [
            editorSchema.node('paragraph', null, []),
        ]);

        return EditorState.create({
            schema: this.editorSchema,
            doc,
            plugins: [
                history(),
                keymap({
                    'Mod-b': toggleMark(editorSchema.marks.strong),
                    'Mod-i': toggleMark(editorSchema.marks.em),
                    'Mod-k': () => (this.showLinkEditor = true),
                    'Mod-u': toggleMark(editorSchema.marks.underline),
                    'Mod-z': undo,
                    'Mod-y': redo,
                    'Shift-Mod-z': redo,
                }),
                keymap(baseKeymap),
            ],
        });
    }

    set value(html) {
        if (!html) {
            html = '<p></p>';
        }

        if (this.editorView) {
            try {
                // Parse the new HTML content
                const doc = DOMParser.fromSchema(this.#editorSchema).parse(
                    this.createFragmentFromHTML(html),
                );

                // Create a new transaction to replace the entire document content
                const tr = this.editorView.state.tr.replaceWith(
                    0,
                    this.editorView.state.doc.content.size,
                    doc.content,
                );

                // Dispatch the transaction to update the editor
                this.editorView.dispatch(tr);
            } catch (e) {
                console.error(e);
            }
        }
        this.requestUpdate();
    }

    initializeEditor() {
        this.editorView = new EditorView(this.shadowRoot, {
            state: this.createEditorState(),
            editable: () => !this.readOnly,
            dispatchTransaction: (transaction) => {
                const newState = this.editorView.state.apply(transaction);
                this.editorView.updateState(newState);

                const content = this.serializeContent();
                this.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { content },
                        bubbles: true,
                        composed: true,
                    }),
                );
            },
        });
    }

    createFragmentFromHTML(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim() || '<p></p>';
        return template.content;
    }

    serializeContent() {
        if (!this.editorView || !this.editorView.state) return '';

        const fragment = DOMSerializer.fromSchema(
            this.#editorSchema,
        ).serializeFragment(this.editorView.state.doc.content);
        const tmp = document.createElement('div');
        tmp.appendChild(fragment);
        return tmp.innerHTML;
    }

    handleToolbarAction(markType) {
        return () => {
            const { state, dispatch } = this.editorView;
            toggleMark(this.#editorSchema.marks[markType])(state, dispatch);
        };
    }

    #getLinkAttrs() {
        const { state } = this.editorView;
        const { selection } = state;
        const markType = this.#editorSchema.marks.link;

        // If there's a selection, use that instead of cursor position
        if (!selection.empty) {
            const { from, to } = selection;
            // Get the first link mark in the selection if it exists
            const marks = state.doc.rangeHasMark(from, to, markType);
            const linkMark = marks
                ? state.doc
                      .resolve(from)
                      .marks()
                      .find((mark) => mark.type === markType)
                : null;

            return {
                url: linkMark ? linkMark.attrs.href : '',
                title: linkMark ? linkMark.attrs.title : '',
                text: state.doc.textBetween(from, to),
            };
        }

        // If no selection, fall back to cursor position behavior
        const $pos = selection.$head;
        const marks = $pos.marks();
        const linkMark = marks.find((mark) => mark.type === markType);

        if (!linkMark) {
            return {
                url: '',
                title: '',
                text: '',
            };
        }

        // Find the full node that contains this mark when at cursor
        let startPos = $pos.pos;
        let endPos = $pos.pos;

        // Search backwards to find start of link
        let searchPos = $pos.pos;
        while (searchPos > 0) {
            const marks = state.doc.rangeHasMark(
                searchPos - 1,
                searchPos,
                markType,
            );
            if (!marks) break;
            startPos = searchPos - 1;
            searchPos--;
        }

        // Search forwards to find end of link
        searchPos = $pos.pos;
        while (searchPos < state.doc.content.size) {
            const marks = state.doc.rangeHasMark(
                searchPos,
                searchPos + 1,
                markType,
            );
            if (!marks) break;
            endPos = searchPos + 1;
            searchPos++;
        }

        return {
            url: linkMark.attrs.href || '',
            title: linkMark.attrs.title || '',
            text: state.doc.textBetween(startPos, endPos),
        };
    }

    #handleLinkSave(e) {
        const { url, text, title } = e.detail;
        const { state, dispatch } = this.editorView;
        const { selection } = state;
        const markType = this.#editorSchema.marks.link;
        let tr = state.tr;

        if (!selection.empty) {
            // Handle selection case
            const { from, to } = selection;

            // First remove any existing link marks in the selection
            if (state.doc.rangeHasMark(from, to, markType)) {
                tr.removeMark(from, to, markType);
            }

            // Update the text if it changed
            if (text && text !== state.doc.textBetween(from, to)) {
                tr.replaceWith(from, to, state.schema.text(text));
            }

            // Add the new link mark
            const mark = markType.create({ href: url, title });
            tr.addMark(from, text ? from + text.length : to, mark);
        } else {
            // Handle cursor position case
            const $pos = selection.$head;
            const marks = $pos.marks();
            const linkMark = marks.find((mark) => mark.type === markType);

            if (linkMark) {
                // Find the full extent of the existing link
                let startPos = $pos.pos;
                let endPos = $pos.pos;

                // Search backwards to find start of link
                let searchPos = $pos.pos;
                while (searchPos > 0) {
                    const marks = state.doc.rangeHasMark(
                        searchPos - 1,
                        searchPos,
                        markType,
                    );
                    if (!marks) break;
                    startPos = searchPos - 1;
                    searchPos--;
                }

                // Search forwards to find end of link
                searchPos = $pos.pos;
                while (searchPos < state.doc.content.size) {
                    const marks = state.doc.rangeHasMark(
                        searchPos,
                        searchPos + 1,
                        markType,
                    );
                    if (!marks) break;
                    endPos = searchPos + 1;
                    searchPos++;
                }

                // Remove the old link mark
                tr.removeMark(startPos, endPos, markType);

                // Update the text if it changed
                if (text && text !== state.doc.textBetween(startPos, endPos)) {
                    tr.replaceWith(startPos, endPos, state.schema.text(text));
                }

                // Add the new link mark
                const mark = markType.create({ href: url, title });
                tr.addMark(
                    startPos,
                    text ? startPos + text.length : endPos,
                    mark,
                );
            } else {
                // No existing link at cursor, create new one at cursor position
                if (text) {
                    const pos = selection.$head.pos;
                    tr.replaceWith(pos, pos, state.schema.text(text));
                    const mark = markType.create({ href: url, title });
                    tr.addMark(pos, pos + text.length, mark);
                }
            }
        }

        dispatch(tr);
        this.showLinkEditor = false;
    }

    async openLinkEditor() {
        const { url, text, title, checkoutParameters } = this.#getLinkAttrs();
        this.showLinkEditor = true;
        await this.updateComplete;
        Object.assign(this.linkEditorElement, {
            url,
            text,
            title,
            checkoutParameters,
        });
    }

    get linkEditorButtonElement() {
        return this.shadowRoot.querySelector('#linkEditorButton');
    }

    get #linkEditorButton() {
        return html`
            <sp-action-button
                id="linkEditorButton"
                emphasized
                @click=${this.openLinkEditor}
                title="Add Link (Ctrl+K)"
            >
                <sp-icon-link slot="icon"></sp-icon-link>
            </sp-action-button>
        `;
    }

    get offerSelectorToolButton() {
        if (!this.ost) return nothing;
        return html`
        <sp-divider size="s" vertical></sp-divider>
        <sp-action-button
                    emphasized
                    @click=${() => (this.showOfferSelectorTool = true)}
                    title="Offer Selector Tool"
                >
                    <sp-icon-offer slot="icon"></sp-icon-offer>
                </sp-action-button>
            </sp-action-group>
            `;
    }

    get linkEditorElement() {
        return this.shadowRoot.querySelector('rte-link-editor');
    }

    get #linkEditor() {
        if (!this.showLinkEditor) return nothing;
        return html`
            <rte-link-editor
                dialog
                @close="${() => (this.showLinkEditor = false)}"
                @save="${this.#handleLinkSave}"
            ></rte-link-editor>
        `;
    }

    render() {
        return html`
            <sp-action-group size="m" aria-lable="RTE toolbar actions">
                <sp-action-button
                    emphasized
                    @click=${this.handleToolbarAction('strong')}
                    title="Bold (Ctrl+B)"
                >
                    <sp-icon-text-bold slot="icon"></sp-icon-text-bold>
                </sp-action-button>
                <sp-action-button
                    emphasized
                    @click=${this.handleToolbarAction('em')}
                    title="Italic (Ctrl+I)"
                >
                    <sp-icon-text-italic slot="icon"></sp-icon-text-italic>
                </sp-action-button>
                <sp-action-button
                    emphasized
                    @click=${this.handleToolbarAction('strikethrough')}
                    title="Strikethrough (Ctrl+Shift+S)"
                >
                    <sp-icon-text-strikethrough
                        slot="icon"
                    ></sp-icon-text-strikethrough>
                </sp-action-button>
                <sp-action-button
                    emphasized
                    @click=${this.handleToolbarAction('underline')}
                    title="Underline (Ctrl+U)"
                >
                    <sp-icon-text-underline
                        slot="icon"
                    ></sp-icon-text-underline>
                </sp-action-button>
                ${this.#linkEditorButton} ${this.offerSelectorToolButton}
            </sp-action-group>
            ${this.#linkEditor}
        `;
    }
}

customElements.define('rte-editor', RteEditor);
