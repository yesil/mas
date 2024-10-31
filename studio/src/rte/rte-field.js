import { LitElement, html, nothing, css } from 'lit';
import { EditorState } from 'prosemirror-state';
import { Schema, DOMParser, DOMSerializer } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { schema } from 'prosemirror-schema-basic';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { addListNodes } from 'prosemirror-schema-list';
import { history, undo, redo } from 'prosemirror-history';
import {
    openOfferSelectorTool,
    attributeFilter,
    closeOfferSelectorTool,
} from './ost.js';

import prosemirrorStyles from './prosemirror.css.js';

const CUSTOM_ELEMENT_CHECKOUT_LINK = 'checkout-link';
const CUSTOM_ELEMENT_INLINE_PRICE = 'inline-price';

class RteField extends LitElement {
    static properties = {
        inline: { type: Boolean, attribute: 'inline' },
        linkSelected: { type: Boolean, state: true },
        priceSelected: { type: Boolean, state: true },
        readOnly: { type: Boolean, attribute: 'readonly' },
        showLinkEditor: { type: Boolean, state: true },
        showOfferSelector: { type: Boolean, state: true },
        value: { type: String, state: true },
    };

    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    gap: 8px;
                    flex-direction: column;
                    font-size: var(--spectrum-font-size-200);
                    background-color: var(--spectrum-global-color-gray-200);
                    padding: 6px;
                }

                :host > div {
                    padding: 4px;
                    min-height: 36px;
                    flex: 1;
                    color: var(--spectrum-global-color-gray-800);
                    background-color: var(--spectrum-global-color-gray-50);
                }

                rte-link-editor {
                    display: contents;
                }

                span[is='inline-price'].ProseMirror-selectednode,
                a[is='checkout-link'].ProseMirror-selectednode {
                    outline: 2px dashed var(--spectrum-global-color-blue-500);
                    outline-offset: 2px;
                    border-radius: 16px;
                }

                a[is='checkout-link'] {
                    height: 32px;
                    box-sizing: border-box;
                    padding: 0 14px;
                    display: inline-flex;
                    align-content: center;
                    border-radius: 16px;
                    text-decoration: none;
                }

                a[is='checkout-link'].primary-link,
                a[is='checkout-link'].secondary-link {
                    height: initial;
                    padding: 0 4px;
                }

                a[is='checkout-link'].accent {
                    background-color: var(--spectrum-global-color-blue-500);
                    color: var(--spectrum-global-color-gray-50);
                }

                a[is='checkout-link'].primary-outline {
                    background-color: initial;
                    border: 2px solid var(--spectrum-global-color-gray-900);
                    color: var(--spectrum-global-color-gray-900);
                }

                a[is='checkout-link'].secondary {
                    color: var(--spectrum-global-color-gray-900);
                    background-color: var(--spectrum-global-color-gray-200);
                }

                a[is='checkout-link'].secondary-outline {
                    background-color: initial;
                    border: 2px solid var(--spectrum-global-color-gray-200);
                    color: var(--spectrum-global-color-gray-900);
                }

                a[is='checkout-link'].primary-link {
                    background-color: initial;
                    color: var(--spectrum-blue-900);
                }

                a[is='checkout-link'].secondary-link {
                    border: none;
                    color: var(--spectrum-gray-800);
                }

                .ProseMirror span[is='inline-price'],
                .ProseMirror a[is='checkout-link'] {
                    cursor: default;
                    display: inline-block;
                    vertical-align: baseline;
                    white-space: nowrap;
                    margin: 0 1px;
                }

                .price.price-strikethrough {
                    text-decoration: line-through;
                }
            `,
            prosemirrorStyles,
        ];
    }

    #editorSchema;
    #editorView;
    #boundHandlers;

    constructor() {
        super();
        this.readOnly = false;
        this.linkSelected = false;
        this.priceSelected = false;
        this.showLinkEditor = false;
        this.showOfferSelector = false;
        this.inline = false;
        this.#boundHandlers = {
            escKey: this.#handleEscKey.bind(this),
            ostEvent: this.#handleOstEvent.bind(this),
            linkSave: this.#handleLinkSave.bind(this),
        };
    }

    firstUpdated() {
        this.#initEditorSchema();
        this.#initializeEditor();
        this.innerHTML = '';
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this.#boundHandlers.escKey);
        document.addEventListener('use', this.#boundHandlers.ostEvent);
        this.addEventListener('close', this.#closeEventStopper);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.#boundHandlers.escKey);
        document.removeEventListener('use', this.#boundHandlers.ostEvent);
        this.removeEventListener('close', this.#closeEventStopper);
        this.#editorView?.destroy();
    }

    #closeEventStopper(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    #initEditorSchema() {
        const nodes = schema.spec.nodes.append({
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
                        tag: `span[is="${CUSTOM_ELEMENT_INLINE_PRICE}"]`,
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
                    class: { default: 'accent' },
                    'data-checkout-workflow': { default: null },
                    'data-checkout-workflow-step': { default: null },
                    'data-extra-options': { default: null },
                    'data-perpetual': { default: null },
                    'data-promotion-code': { default: null },
                    'data-wcs-osi': { default: null },
                    title: { default: null },
                    text: { default: null },
                    target: { default: null },
                },
                parseDOM: [
                    {
                        tag: `a[is="${CUSTOM_ELEMENT_CHECKOUT_LINK}"]`,
                        getAttrs: (dom) => ({
                            ...this.#collectDataAttributes(dom),
                            title: dom.getAttribute('title'),
                            text: dom.innerText,
                            target: dom.getAttribute('target'),
                            'data-extra-options': new URLSearchParams(
                                Object.entries(
                                    JSON.parse(
                                        dom.getAttribute(
                                            'data-extra-options',
                                        ) ?? '{}',
                                    ),
                                ),
                            ).toString(),
                        }),
                    },
                ],
                toDOM: this.#createCheckoutLinkElement,
            },
        });

        const marks = schema.spec.marks.append({
            strikethrough: {
                parseDOM: [{ tag: 's' }],
                toDOM: () => ['s', 0],
            },
            underline: {
                parseDOM: [{ tag: 'u' }],
                toDOM: () => ['u', 0],
            },
        });

        if (this.inline) {
            delete nodes.paragraph;
            nodes.get('doc').content = 'inline+';
        }

        this.#editorSchema = new Schema({
            nodes: addListNodes(nodes, 'paragraph block*', 'block'),
            marks,
        });
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
        const element = document.createElement('span', {
            is: CUSTOM_ELEMENT_INLINE_PRICE,
        });
        element.setAttribute('is', CUSTOM_ELEMENT_INLINE_PRICE);
        Object.entries(node.attrs || {}).forEach(([key, value]) => {
            if (value !== null) {
                element.setAttribute(key, value);
            }
        });
        return element;
    }

    #createCheckoutLinkElement(node) {
        const element = document.createElement('a', {
            is: CUSTOM_ELEMENT_CHECKOUT_LINK,
        });
        element.setAttribute('is', CUSTOM_ELEMENT_CHECKOUT_LINK);
        const {
            title,
            text,
            'data-extra-options': extraOptions,
            ...attrs
        } = node.attrs;

        if (title) element.setAttribute('title', title);
        if (text) element.innerText = text;
        if (extraOptions) {
            element.setAttribute(
                'data-extra-options',
                JSON.stringify(
                    Object.fromEntries(
                        new URLSearchParams(extraOptions).entries(),
                    ),
                ),
            );
        }

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
        this.#editorView = new EditorView(this.shadowRoot, {
            state: this.#createEditorState(),
            editable: () => !this.readOnly,
            dispatchTransaction: this.#handleTransaction.bind(this),
        });

        try {
            const html = this.innerHTML.trim();
            this.innerHTML = '';
            const container = document.createElement('div');
            container.innerHTML = html;
            // remove hrefs from checkout links to avoid collisions with link marks
            container.querySelectorAll('a[is="checkout-link"]').forEach((a) => {
                a.removeAttribute('href');
            });
            // remove wrapper divs
            container
                .querySelectorAll('div')
                .forEach((div) => (div.outerHTML = div.innerHTML));

            // remove wrapper strongs
            container
                .querySelectorAll('strong > a')
                .forEach((a) => (a.parentElement.outerHTML = a.outerHTML));

            // fix "is" attribute of broken checkout links
            container.querySelectorAll('a').forEach((a) => {
                if (a.dataset.wcsOsi)
                    a.setAttribute('is', CUSTOM_ELEMENT_CHECKOUT_LINK);
            });

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
        this.requestUpdate();
    }

    #createEditorState() {
        const doc = this.#editorSchema.node('doc', null, [
            this.#editorSchema.node(
                this.inline ? 'text' : 'paragraph',
                null,
                [],
            ),
        ]);

        return EditorState.create({
            schema: this.#editorSchema,
            doc,
            plugins: [
                history(),
                keymap({
                    'Mod-b': toggleMark(this.#editorSchema.marks.strong),
                    'Mod-i': toggleMark(this.#editorSchema.marks.em),
                    'Mod-k': () => this.openLinkEditor(),
                    'Mod-u': toggleMark(this.#editorSchema.marks.link),
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
        let newState = this.#editorView.state.apply(transaction);
        // newState = mergeAdjacentLinks(newState);
        this.#editorView.updateState(newState);
        const value = this.#serializeContent();
        this.value = value;

        // Update linkSelected based on current selection
        this.#updateSelection(newState);

        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
            }),
        );
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
            this.showOfferSelector = false;
            closeOfferSelectorTool();
        }
    }

    #handleOstEvent({ detail: attributes }) {
        if (!this.showOfferSelector || !attributes) return;

        const { state, dispatch } = this.#editorView;
        const { selection } = state;
        const nodeType =
            attributes.is === CUSTOM_ELEMENT_INLINE_PRICE
                ? state.schema.nodes.inlinePrice
                : state.schema.nodes.checkoutLink;

        // Get existing element's class if present
        let existingClass;
        if (selection.node) {
            existingClass = selection.node.attrs.class;
        }

        // Preserve existing class if no new class is provided
        const mergedAttributes = {
            ...attributes,
            class: attributes.class || existingClass,
        };

        let content = null;
        if (attributes.is === CUSTOM_ELEMENT_CHECKOUT_LINK && attributes.text) {
            content = state.schema.text(attributes.text);
        }

        const node = nodeType.create(mergedAttributes, content);
        const tr = selection.empty
            ? state.tr.insert(selection.from, node)
            : state.tr.replaceWith(selection.from, selection.to, node);

        dispatch(tr);
        this.showOfferSelector = false;
        closeOfferSelectorTool();
    }

    handleToolbarAction(markType) {
        return () => {
            const { state, dispatch } = this.#editorView;
            toggleMark(this.#editorSchema.marks[markType])(state, dispatch);
        };
    }

    #updateSelection(state) {
        const { selection } = state;
        if (selection.from - selection.to === 0) {
            this.linkSelected = false;
            return;
        }
        let isLinkSelected = false;

        // Check for regular link mark in the current selection
        if (!selection.empty) {
            // Check if the entire selection has a link mark
            isLinkSelected = state.doc.rangeHasMark(
                selection.from,
                selection.to,
                state.schema.marks.link,
            );
        }
        // Check for regular link mark at cursor position
        else {
            const marks = selection.$from.marks();
            isLinkSelected = marks.some(
                (mark) => mark.type === state.schema.marks.link,
            );
        }
        this.linkSelected = isLinkSelected;
    }

    #getLinkAttrs() {
        const { state } = this.#editorView;
        const { selection } = state;
        const markType = this.#editorSchema.marks.link;

        // Check if we're on a checkoutLink node
        if (!selection.empty && selection.node?.type.name === 'checkoutLink') {
            const node = selection.node;
            return {
                url: '',
                title: node.attrs.title || '',
                text: node.attrs.text || node.textContent || '',
                target: node.attrs.target || '_self',
                variant: node.attrs.class || '',
                checkoutParameters: node.attrs['data-extra-options'] || '',
            };
        }

        if (!selection.empty) {
            return this.#getSelectionLinkAttrs(selection, markType);
        }

        return this.#getCursorLinkAttrs(selection, markType);
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
        const { url, text, title, target, variant, checkoutParameters } =
            event.detail;
        const { state, dispatch } = this.#editorView;
        let tr = state.tr;

        if (checkoutParameters !== undefined) {
            tr = this.#handleCheckoutLinkSave(
                tr,
                text,
                title,
                target,
                variant,
                checkoutParameters,
            );
        } else {
            tr = this.#handleRegularLinkSave(tr, url, text, title);
        }

        dispatch(tr);
        this.showLinkEditor = false;
    }

    #handleCheckoutLinkSave(
        tr,
        text,
        title,
        target,
        variant,
        checkoutParameters,
    ) {
        const { selection } = this.#editorView.state;

        // We can only update existing checkout links, not create new ones
        if (!selection.node || selection.node.type.name !== 'checkoutLink') {
            console.warn('Cannot create new checkout links via link editor');
            return tr;
        }

        // Get the existing node's attributes
        const existingAttrs = selection.node.attrs;

        // Update only the attributes that rte-link-editor provides
        const updatedAttrs = {
            ...existingAttrs,
            title: title || existingAttrs.title,
            text: text || existingAttrs.text,
            target: target || existingAttrs.target,
            class: variant || existingAttrs.variant,
            // Only update data-extra-options if checkoutParameters is provided
            'data-extra-options':
                checkoutParameters || existingAttrs['data-extra-options'],
        };

        // Create updated node with existing node type and updated attributes
        const updatedNode = selection.node.type.create(updatedAttrs);

        // Replace the existing node with the updated one
        return tr.replaceWith(selection.from, selection.to, updatedNode);
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
        const dom = this.#editorView.nodeDOM(selection.from);
        return dom?.isInlinePrice || dom?.isCheckoutLink ? dom : undefined;
    }

    handleOpenOfferSelector() {
        this.showOfferSelector = true;
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

    get linkEditorButtonElement() {
        return this.shadowRoot.querySelector('#linkEditorButton');
    }

    // Template getters
    get #unlinkEditorButton() {
        if (!this.linkSelected) return;
        return html`
            <sp-action-button
                id="unlinkEditorButton"
                title="Underline (Ctrl+U)"
                emphasized
                @click=${this.handleToolbarAction('link')}
            >
                <sp-icon-unlink slot="icon"></sp-icon-unlink>
            </sp-action-button>
        `;
    }

    get unlinkEditorButtonElement() {
        return this.shadowRoot.querySelector('#unlinkEditorButton');
    }

    get #offerSelectorToolButton() {
        return html`
            <sp-divider size="s" vertical></sp-divider>
            <sp-action-button
                emphasized
                id="offerSelectorToolButton"
                @click=${this.handleOpenOfferSelector}
                title="Offer Selector Tool"
            >
                <sp-icon-shopping-cart slot="icon"></sp-icon-shopping-cart>
            </sp-action-button>
        `;
    }
    get offerSelectorToolButtonElement() {
        return this.shadowRoot.querySelector('#offerSelectorToolButton');
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

    get linkEditorElement() {
        return this.shadowRoot.querySelector('rte-link-editor');
    }

    render() {
        return html`
            <sp-action-group size="m" aria-label="RTE toolbar actions">
                ${this.#renderFormatButtons()} ${this.#linkEditorButton}
                ${this.#unlinkEditorButton} ${this.#offerSelectorToolButton}
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
            >
                <sp-icon-text-underline slot="icon"></sp-icon-text-underline>
            </sp-action-button>
        `;
    }
}

customElements.define('rte-field', RteField);
