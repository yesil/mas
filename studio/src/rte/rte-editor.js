import { LitElement, html, css, nothing } from 'lit';
import { EditorState } from 'prosemirror-state';
import { Schema, DOMParser, DOMSerializer } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';
import {
    openOfferSelectorTool,
    attributeFilter,
    closeOfferSelectorTool,
} from './ost.js';

class RteEditor extends LitElement {
    static properties = {
        readOnly: { type: Boolean, attribute: 'readonly' },
        showLinkEditor: { type: Boolean, state: true },
    };

    static styles = css`
        :host {
            display: flex;
            gap: 8px;
            flex-direction: column;
            font-size: var(--spectrum-font-size-200);
            background-color: var(--spectrum-global-color-gray-200);
            padding: 6px;
        }

        :host > div {
            padding: 0 8px;
            min-height: 48px;
            flex: 1;
            color: var(--spectrum-global-color-gray-800);
            background-color: var(--spectrum-global-color-gray-50);
        }

        checkout-link {
            height: 32px;
            padding: 0 14px;
            display: inline-flex;
            align-content: center;
            border-radius: 16px;
            background-color: var(--spectrum-global-color-blue-500);
            color: var(--spectrum-global-color-gray-50);
        }

        checkout-link.outline {
            background-color: initial;
            border: 2px solid var(--spectrum-global-color-gray-900);
            color: var(--spectrum-global-color-gray-900);
        }

        .ProseMirror inline-price,
        .ProseMirror checkout-link {
            cursor: default;
            user-select: all;
            display: inline-block;
            vertical-align: baseline;
            white-space: nowrap;
            margin: 0 1px;
        }

        inline-price.ProseMirror-selectednode,
        checkout-link.ProseMirror-selectednode {
            outline: 2px solid var(--spectrum-global-color-blue-500);
        }
    `;

    #editorSchema;
    #editorView;
    #boundHandlers;

    constructor() {
        super();
        this.readOnly = false;
        this.showLinkEditor = false;
        this.#boundHandlers = {
            escKey: this.#handleEscKey.bind(this),
            ostEvent: this.#handleOstEvent.bind(this),
            linkSave: this.#handleLinkSave.bind(this),
        };
    }

    firstUpdated() {
        this.#initEditorSchema();
        this.#initializeEditor();
        this.value = this.innerHTML.trim();
        this.innerHTML = '';
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this.#boundHandlers.escKey);
        document.addEventListener('use', this.#boundHandlers.ostEvent);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this.#boundHandlers.escKey);
        document.removeEventListener('use', this.#boundHandlers.ostEvent);
        this.#editorView?.destroy();
    }

    #initEditorSchema() {
        const nodes = {
            text: { group: 'inline' },
            inlinePrice: {
                group: 'inline',
                inline: true,
                atom: true,
                inclusive: false,
                attrs: {
                    is: { default: null },
                    class: { default: null },
                    'data-display-old-price': { default: null },
                    'data-display-per-unit': { default: null },
                    'data-display-recurrence': { default: null },
                    'data-display-tax': { default: null },
                    'data-perpetual': { default: null },
                    'data-promotion-code': { default: null },
                    'data-tax-exclusive': { default: null },
                    'data-template': { default: null },
                    'data-wcs-osi': { default: null },
                },
                parseDOM: [
                    {
                        tag: 'span[is="inline-price"],inline-price',
                        getAttrs: this.#collectDataAttributes,
                    },
                ],
                toDOM: this.#createInlinePriceElement,
            },
            checkoutLink: {
                group: 'inline',
                content: 'text*',
                inclusive: false,
                inline: true,
                atom: true,
                attrs: {
                    is: { default: null },
                    class: { default: null },
                    'data-checkout-workflow': { default: null },
                    'data-checkout-workflow-step': { default: null },
                    'data-extra-options': { default: null },
                    'data-perpetual': { default: null },
                    'data-promotion-code': { default: null },
                    'data-wcs-osi': { default: null },
                    title: { default: null },
                    text: { default: null },
                },
                parseDOM: [
                    {
                        tag: 'a[is="checkout-link"],checkout-link',
                        getAttrs: (dom) => ({
                            ...this.#collectDataAttributes(dom),
                            title: dom.getAttribute('title'),
                            text: dom.innerText,
                        }),
                    },
                ],
                toDOM: this.#createCheckoutLinkElement,
            },
            paragraph: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'p' }],
                toDOM: () => ['p', 0],
            },
            doc: {
                content: 'block+',
            },
        };

        const marks = {
            strong: {
                parseDOM: [{ tag: 'strong' }, { tag: 'b' }],
                toDOM: () => ['strong', 0],
            },
            em: {
                parseDOM: [
                    { tag: 'i' },
                    { tag: 'em' },
                    { style: 'font-style=italic' },
                ],
                toDOM: () => ['em', 0],
            },
            strikethrough: {
                parseDOM: [{ tag: 's' }],
                toDOM: () => ['s', 0],
            },
            underline: {
                parseDOM: [{ tag: 'u' }],
                toDOM: () => ['u', 0],
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
                        getAttrs: (dom) => ({
                            href: dom.getAttribute('href'),
                            title: dom.getAttribute('title'),
                        }),
                    },
                ],
                toDOM: (node) => ['a', node.attrs, 0],
            },
        };

        this.#editorSchema = new Schema({ nodes, marks });
    }

    #collectDataAttributes(dom) {
        const attrs = {};
        dom.getAttributeNames()
            .filter(attributeFilter)
            .forEach((key) => {
                attrs[key] = dom.getAttribute(key);
            });
        return attrs;
    }

    #createInlinePriceElement(node) {
        const element = document.createElement('inline-price', {
            is: 'inline-price',
        });
        Object.entries(node.attrs || {}).forEach(([key, value]) => {
            if (value !== null) {
                element.setAttribute(key, value);
            }
        });
        return element;
    }

    #createCheckoutLinkElement(node) {
        const element = document.createElement('checkout-link', {
            is: 'checkout-link',
        });
        const { title, text, ...attrs } = node.attrs;

        if (title) element.setAttribute('title', title);
        if (text) element.innerText = text;

        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        Object.entries(attrs || {}).forEach(([key, value]) => {
            if (value !== null) {
                element.setAttribute(key, value);
            }
        });
        return element;
    }

    #initializeEditor() {
        const container = document.createElement('div');
        this.shadowRoot.appendChild(container);

        this.#editorView = new EditorView(container, {
            state: this.#createEditorState(),
            editable: () => !this.readOnly,
            dispatchTransaction: this.#handleTransaction.bind(this),
        });
    }

    #createEditorState() {
        const doc = this.#editorSchema.node('doc', null, [
            this.#editorSchema.node('paragraph', null, []),
        ]);

        return EditorState.create({
            schema: this.#editorSchema,
            doc,
            plugins: [
                history(),
                keymap({
                    'Mod-b': toggleMark(this.#editorSchema.marks.strong),
                    'Mod-i': toggleMark(this.#editorSchema.marks.em),
                    'Mod-k': () => (this.showLinkEditor = true),
                    'Mod-u': toggleMark(this.#editorSchema.marks.underline),
                    'Mod-s': toggleMark(this.#editorSchema.marks.strikethrough),
                    'Mod-z': undo,
                    'Mod-y': redo,
                    'Shift-Mod-z': redo,
                }),
                keymap(baseKeymap),
            ],
        });
    }

    #handleTransaction(transaction) {
        const newState = this.#editorView.state.apply(transaction);
        this.#editorView.updateState(newState);
        const content = this.#serializeContent();
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { content },
                bubbles: true,
                composed: true,
            }),
        );
    }

    set value(html) {
        if (!html) {
            html = '<p></p>';
        }

        if (this.#editorView) {
            try {
                const container = document.createElement('div');
                container.innerHTML = html.trim();
                const doc = DOMParser.fromSchema(this.#editorSchema).parse(
                    container,
                );
                const tr = this.#editorView.state.tr.replaceWith(
                    0,
                    this.#editorView.state.doc.content.size,
                    doc.content,
                );
                this.#editorView.dispatch(tr);
            } catch (error) {
                console.error('Error setting editor value:', error);
            }
        }
        this.requestUpdate();
    }

    #serializeContent() {
        if (!this.#editorView?.state) return '';

        const fragment = DOMSerializer.fromSchema(
            this.#editorSchema,
        ).serializeFragment(this.#editorView.state.doc.content);

        const container = document.createElement('div');
        container.appendChild(fragment);
        return container.innerHTML;
    }

    #handleEscKey(event) {
        if (event.key === 'Escape') {
            this.showLinkEditor = false;
            closeOfferSelectorTool();
        }
    }

    #handleOstEvent({ detail: attributes }) {
        if (!attributes) return;

        const { state, dispatch } = this.#editorView;
        const { selection } = state;
        const nodeType =
            attributes.is === 'inline-price'
                ? state.schema.nodes.inlinePrice
                : state.schema.nodes.checkoutLink;

        let content = null;
        if (attributes.is === 'checkout-link' && attributes.text) {
            content = state.schema.text(attributes.text);
            delete attributes.text;
        }

        const node = nodeType.create(attributes, content);
        const tr = selection.empty
            ? state.tr.insert(selection.from, node)
            : state.tr.replaceWith(selection.from, selection.to, node);

        dispatch(tr);
        closeOfferSelectorTool();
    }

    handleToolbarAction(markType) {
        return () => {
            const { state, dispatch } = this.#editorView;
            toggleMark(this.#editorSchema.marks[markType])(state, dispatch);
        };
    }

    #getLinkAttrs() {
        const { state } = this.#editorView;
        const { selection } = state;
        const markType = this.#editorSchema.marks.link;

        if (!selection.empty && selection.node?.type.name === 'checkoutLink') {
            return this.#getCheckoutLinkAttrs(selection.node);
        }

        if (!selection.empty) {
            return this.#getSelectionLinkAttrs(selection, markType);
        }

        return this.#getCursorLinkAttrs(selection, markType);
    }

    #getCheckoutLinkAttrs(node) {
        let extraOptions = {};
        try {
            extraOptions = new URLSearchParams(
                node.attrs['data-extra-options']
                    ? JSON.parse(node.attrs['data-extra-options'])
                    : {},
            ).toString();
        } catch (error) {
            console.warn('Failed to parse extra options:', error);
        }

        return {
            url: '',
            title: node.attrs.title || '',
            text: node.attrs.text || node.textContent || '',
            isCheckoutLink: true,
            checkoutParameters: extraOptions,
        };
    }

    #getSelectionLinkAttrs(selection, markType) {
        const { from, to } = selection;
        const marks = this.#editorView.state.doc.rangeHasMark(
            from,
            to,
            markType,
        );
        const linkMark = marks
            ? selection.$from.marks().find((mark) => mark.type === markType)
            : null;

        return {
            url: linkMark?.attrs.href || '',
            title: linkMark?.attrs.title || '',
            text: this.#editorView.state.doc.textBetween(from, to),
            isCheckoutLink: false,
        };
    }

    #getCursorLinkAttrs(selection, markType) {
        const marks = selection.$head.marks();
        const linkMark = marks.find((mark) => mark.type === markType);

        if (!linkMark) {
            return {
                url: '',
                title: '',
                text: '',
                isCheckoutLink: false,
            };
        }

        const { startPos, endPos } = this.#findLinkBoundaries(
            selection,
            markType,
        );

        return {
            url: linkMark.attrs.href || '',
            title: linkMark.attrs.title || '',
            text: this.#editorView.state.doc.textBetween(startPos, endPos),
            isCheckoutLink: false,
        };
    }

    #findLinkBoundaries(selection, markType) {
        let startPos = selection.$head.pos;
        let endPos = selection.$head.pos;
        const state = this.#editorView.state;

        let pos = selection.$head.pos;
        while (pos > 0 && state.doc.rangeHasMark(pos - 1, pos, markType)) {
            startPos = --pos;
        }

        pos = selection.$head.pos;
        while (
            pos < state.doc.content.size &&
            state.doc.rangeHasMark(pos, pos + 1, markType)
        ) {
            endPos = ++pos;
        }

        return { startPos, endPos };
    }

    #handleLinkSave(event) {
        const { url, text, title, isCheckoutLink, checkoutParameters } =
            event.detail;
        const { state, dispatch } = this.#editorView;
        let tr = state.tr;

        if (isCheckoutLink) {
            tr = this.#handleCheckoutLinkSave(
                tr,
                text,
                title,
                checkoutParameters,
            );
        } else {
            tr = this.#handleRegularLinkSave(tr, url, text, title);
        }

        dispatch(tr);
        this.showLinkEditor = false;
    }

    #handleCheckoutLinkSave(tr, text, title, parameters) {
        const { selection } = this.#editorView.state;
        const node = this.#editorSchema.nodes.checkoutLink.create({
            is: 'checkout-link',
            title,
            text,
            'data-checkout-workflow': parameters?.workflow || '',
            'data-checkout-workflow-step': parameters?.workflowStep || '',
            'data-extra-options': parameters?.extraOptions || '',
            'data-perpetual': parameters?.perpetual || '',
            'data-promotion-code': parameters?.promotionCode || '',
            'data-wcs-osi': parameters?.wcsOsi || '',
        });

        return tr.replaceWith(selection.from, selection.to, node);
    }

    #handleRegularLinkSave(tr, url, text, title) {
        const { selection } = this.#editorView.state;
        const markType = this.#editorSchema.marks.link;
        const mark = markType.create({ href: url, title });

        if (!selection.empty) {
            tr = this.#handleSelectionLinkSave(
                tr,
                selection,
                markType,
                text,
                mark,
            );
        } else {
            tr = this.#handleCursorLinkSave(
                tr,
                selection,
                markType,
                text,
                mark,
            );
        }

        return tr;
    }

    #handleSelectionLinkSave(tr, selection, markType, text, mark) {
        tr = tr.removeMark(selection.from, selection.to, markType);

        if (
            text &&
            text !==
                this.#editorView.state.doc.textBetween(
                    selection.from,
                    selection.to,
                )
        ) {
            tr = tr.replaceWith(
                selection.from,
                selection.to,
                this.#editorSchema.text(text),
            );
        }

        return tr.addMark(
            selection.from,
            text ? selection.from + text.length : selection.to,
            mark,
        );
    }

    #handleCursorLinkSave(tr, selection, markType, text, mark) {
        const { startPos, endPos } = this.#findLinkBoundaries(
            selection,
            markType,
        );

        tr = tr.removeMark(startPos, endPos, markType);

        if (text) {
            if (
                text !==
                this.#editorView.state.doc.textBetween(startPos, endPos)
            ) {
                tr = tr.replaceWith(
                    startPos,
                    endPos,
                    this.#editorSchema.text(text),
                );
            }
            tr = tr.addMark(startPos, startPos + text.length, mark);
        }

        return tr;
    }

    async openLinkEditor() {
        const attrs = this.#getLinkAttrs();
        this.showLinkEditor = true;
        await this.updateComplete;
        Object.assign(this.shadowRoot.querySelector('rte-link-editor'), attrs);
    }

    #getCurrentOfferElement() {
        const { selection } = this.#editorView.state;
        let node = this.#editorView
            .domAtPos(selection.from)
            .node.querySelector?.('inline-price,checkout-link');
        return node;
    }

    handleOpenOfferSelector() {
        openOfferSelectorTool(this.#getCurrentOfferElement());
    }

    // Template getters
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

    get #offerSelectorButton() {
        return html`
            <sp-divider size="s" vertical></sp-divider>
            <sp-action-button
                emphasized
                @click=${this.handleOpenOfferSelector}
                title="Offer Selector Tool"
            >
                <sp-icon-shopping-cart slot="icon"></sp-icon-shopping-cart>
            </sp-action-button>
        `;
    }

    get #linkEditor() {
        if (!this.showLinkEditor) return nothing;
        return html`
            <rte-link-editor
                dialog
                @close="${() => (this.showLinkEditor = false)}"
                @save="${this.#boundHandlers.linkSave}"
            ></rte-link-editor>
        `;
    }

    render() {
        return html`
            <sp-action-group size="m" aria-label="RTE toolbar actions">
                ${this.#renderFormatButtons()} ${this.#linkEditorButton}
                ${this.#offerSelectorButton}
            </sp-action-group>
            ${this.#linkEditor}
        `;
    }

    #renderFormatButtons() {
        return html`
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
                <sp-icon-text-underline slot="icon"></sp-icon-text-underline>
            </sp-action-button>
        `;
    }
}

customElements.define('rte-editor', RteEditor);
