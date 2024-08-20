import { html, LitElement, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Store } from './store/Store.js';
import { EVENT_SUBMIT } from './events.js';
import { repeat } from 'lit/directives/repeat.js';
import { Reaction } from 'mobx';
import { MobxReactionUpdateCustom } from '@adobe/lit-mobx/lib/mixin-custom.js';
import {
    deeplink,
    pushState,
} from '@adobecom/milo/libs/features/mas/web-components/src/deeplink.js';
import { Fragment } from './store/Fragment.js';
import './rte-editor.js';
import { classMap } from 'lit/directives/class-map.js';

import { defaults as ostDefaults, createMarkup } from './ost.js';
import { RteEditor } from './rte-editor.js';

const models = {
    merchCard: {
        path: '/conf/sandbox/settings/dam/cfm/models/merch-card',
        name: 'Merch Card',
    },
};

class MasStudio extends MobxReactionUpdateCustom(LitElement, Reaction) {
    static properties = {
        store: { type: Object, state: true },
        bucket: { type: String, attribute: 'aem-bucket' },
        searchText: { type: String, state: true },
        confirmSelect: {
            type: Boolean,
            state: true,
        } /* display dialog to save changes before selecting a new fragment */,
        fragment: {
            type: Object,
            state: true,
        } /* refence to fragment while the dialog is open */,
        fragmentOffsets: {
            type: Object,
            state: true,
        } /* the offset top of last clicked fragment */,
    };

    #ostRoot;
    /**
     * @type {RteEditor}
     */
    #currentRte;

    constructor() {
        super();
        this.confirmSelect = false;
        document.addEventListener(
            'editor-action-click',
            this.editorActionClickHandler.bind(this),
        );
    }

    connectedCallback() {
        super.connectedCallback();
        this.store = new Store(this.bucket);
        this.startDeeplink();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.deeplinkDisposer();
        this.removeEventListener(
            'editor-action-click',
            this.editorActionClickHandler,
        );
    }

    get search() {
        return this.querySelector('sp-search');
    }

    get picker() {
        return this.querySelector('sp-picker');
    }

    createRenderRoot() {
        return this;
    }

    get selectFragmentDialog() {
        if (!this.confirmSelect) return nothing;
        return html`
            <sp-underlay open></sp-underlay>
            <sp-dialog size="m">
                <h1 slot="heading">You have unsaved changes!</h1>
                <p>
                    Do you want to save your changes before selecting another
                    merch card?
                </p>
                <sp-button
                    slot="button"
                    @click="${() =>
                        this.editFragment(null, this.fragment, true)}"
                >
                    Save
                </sp-button>
                <sp-button
                    slot="button"
                    variant="primary"
                    @click="${() =>
                        this.editFragment(null, this.fragment, true)}"
                >
                    Discard
                </sp-button>
                <sp-button
                    slot="button"
                    variant="secondary"
                    @click="${this.closeConfirmSelect}"
                >
                    Cancel
                </sp-button>
            </sp-dialog>
        `;
    }

    get fragmentEditorToolbar() {
        if (!this.store.fragment) return nothing;
        return html`<div id="actions">
            <sp-action-group
                aria-label="Fragment actions"
                role="group"
                compact
                emphasized
            >
                <sp-action-button
                    label="Save"
                    title="Save changes"
                    value="save"
                    @click="${this.saveFragment}"
                >
                    <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
                </sp-action-button>
                <sp-action-button
                    label="Discard"
                    title="Discard changes"
                    value="discard"
                >
                    <sp-icon-undo slot="icon"></sp-icon-undo>
                </sp-action-button>
                <sp-action-button
                    label="Clone"
                    value="clone"
                    @click="${this.copyFragment}"
                >
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>
                <sp-action-button label="Publish" value="publish">
                    <sp-icon-publish-check slot="icon"></sp-icon-publish-check>
                </sp-action-button>
                <sp-action-button label="Unpublish" value="unpublish">
                    <sp-icon-publish-remove
                        slot="icon"
                    ></sp-icon-publish-remove>
                </sp-action-button>
            </sp-action-group>
            <sp-divider vertical></sp-divider>
            <sp-action-group>
                <overlay-trigger type="modal" receive-focus="true">
                    <sp-dialog-base underlay slot="click-content">
                        <sp-dialog
                            size="l"
                            no-divider
                            dismissable
                            mode="fullscreen"
                        >
                            <div id="ost"></div>
                        </sp-dialog>
                    </sp-dialog-base>
                    <sp-action-button
                        slot="trigger"
                        title="Offer Selector Tool"
                        label="Offer Selector Tool"
                        value="offer-selector"
                        @click="${this.editorActionClickHandler}"
                    >
                        <sp-icon-star slot="icon"></sp-icon-star>
                    </sp-action-button>
                </overlay-trigger>
            </sp-action-group>
            <sp-divider vertical></sp-divider>
            <sp-action-group>
                <sp-action-button
                    title="Close"
                    label="Close"
                    value="close"
                    @click="${this.closeFragmentEditor}"
                >
                    <sp-icon-close-circle slot="icon"></sp-icon-close-circle>
                </sp-action-button>
            </sp-action-group>
        </div>`;
    }

    get fragmentEditor() {
        const classes = { open: this.store.fragment };
        return html`<div id="editor" class=${classMap(classes)}>
            ${this.merchCardFragmentEditor} ${this.fragmentEditorToolbar}
        </div>`;
    }

    get merchCardFragmentEditor() {
        const { fragment } = this.store;
        if (!fragment) return nothing;
        const form = Object.fromEntries(
            fragment.fields.map((f) => [f.name, f]),
        );
        return html`<sp-field-label for="card-variant">Variant</sp-field-label>
            <sp-picker
                id="card-variant"
                data-field="variant"
                value="${form.variant.values[0]}"
                @change="${this.updateFragment}"
            >
                <span slot="label">Choose a variant:</span>
                <sp-menu-item value="ccd-action">CCD Action</sp-menu-item>
                <sp-menu-item>Special Offers</sp-menu-item>
                <sp-menu-item>CCH</sp-menu-item>
                <sp-menu-item>Plans</sp-menu-item>
                <sp-menu-item>Catalog</sp-menu-item>
            </sp-picker>
            <sp-field-label for="card-title">Title</sp-field-label>
            <sp-textfield
                placeholder="Enter card title"
                id="card-title"
                data-field="title"
                value="${form.title.values[0]}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="card-icon">Icons</sp-field-label>
            <sp-textfield
                placeholder="Enter icon URLs"
                id="card-icon"
                data-field="icon"
                multiline
                value="${form.icon.values.join(',')}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="horizontal"> Prices </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor
                    data-field="prices"
                    @focus="${this.focusOnRte}"
                    @blur="${this.updateFragment}"
                    >${unsafeHTML(form.prices.values[0])}</rte-editor
                >
            </sp-field-group>
            <sp-field-label for="horizontal"> Description </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor
                    data-field="description"
                    @focus="${this.focusOnRte}"
                    @blur="${this.updateFragment}"
                    >${unsafeHTML(form.description.values[0])}</rte-editor
                >
            </sp-field-group>
            <sp-field-label for="horizontal"> Footer </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor
                    data-field="ctas"
                    @focus="${this.focusOnRte}"
                    @blur="${this.updateFragment}"
                    >${unsafeHTML(form.ctas.values[0])}</rte-editor
                >
            </sp-field-group> `;
    }

    get fragmentEditorEl() {
        return this.querySelector('#editor');
    }

    get result() {
        if (this.store.search.result.length === 0) return nothing;
        return html`<ul id="result">
            ${repeat(
                this.store.search.result,
                (item) => item.path,
                (item) => {
                    switch (item.model.path) {
                        case models.merchCard.path:
                            return html`<merch-card
                                @dblclick="${(e) => this.editFragment(e, item)}"
                            >
                                <merch-datasource
                                    path="${item.path}"
                                ></merch-datasource>
                                ${item.hasChanges
                                    ? html` <sp-status-light
                                          size="l"
                                          variant="yellow"
                                      ></sp-status-light>`
                                    : ''}
                            </merch-card>`;
                        default:
                            return nothing;
                    }
                },
            )}
        </ul>`;
    }

    render() {
        if (!this.store) return nothing;
        return html`
            <h1>Merch at Scale Studio</h1>
            <div>
                <sp-search
                    placeholder="Search"
                    @input="${this.handleSearch}"
                    @submit="${this.handleSearch}"
                    value=${this.searchText}
                    size="m"
                ></sp-search>
                <sp-picker
                    label="Fragment model"
                    size="m"
                    value=${this.store.search.modelId}
                >
                    <sp-menu-item value="all">All</sp-menu-item>
                    <sp-menu-item
                        value="L2NvbmYvc2FuZGJveC9zZXR0aW5ncy9kYW0vY2ZtL21vZGVscy9tZXJjaC1jYXJk"
                        >Merch Card</sp-menu-item
                    >
                </sp-picker>
                <sp-button
                    ?disabled="${!this.searchText}"
                    @click=${this.doSearch}
                    >Search</sp-button
                >
            </div>
            ${this.result} ${this.fragmentEditor} ${this.selectFragmentDialog}
            ${this.toast} ${this.loadingIndicator}
        `;
    }

    get toast() {
        return html`<sp-toast timeout="6000"></sp-toast>`;
    }

    get loadingIndicator() {
        if (!this.store.loading) return nothing;
        return html`<sp-progress-circle
            indeterminate
            size="l"
        ></sp-progress-circle>`;
    }

    get toastEl() {
        return this.querySelector('sp-toast');
    }

    async startDeeplink() {
        this.deeplinkDisposer = deeplink(({ path, modelId, query }) => {
            this.searchText = query;
            this.store.search.update({ path, modelId });
        });
        if (this.searchText) {
            await this.updateComplete;
            this.doSearch();
        } else {
            this.store.search.setResult([]);
        }
    }

    showToast(message, variant = 'info') {
        this.toastEl.innerHTML = message;
        this.toastEl.variant = variant;
        this.toastEl.open = true;
    }

    /**
     * @param {Event} e click event, maybe null
     * @param {Fragment} fragment
     * @param {boolean} force - discard unsaved changes
     */
    async editFragment(e, fragment, force = false) {
        if (e) {
            const merchCard = e.target.closest('merch-card');
            const { offsetTop, offsetHeight } = merchCard;
            this.fragmentOffsets = [`${offsetTop + offsetHeight + 20}px`];
        }
        if (fragment && fragment === this.store.fragment) return;
        if (this.store.fragment?.hasChanges && !force) {
            this.fragment = fragment;
            this.confirmSelect = true; // TODO make me smart
        } else {
            await this.store.selectFragment(fragment);
            this.fragment = undefined;
            this.confirmSelect = false;
            // re-position the form
            await this.updateComplete;
            this.fragmentEditorEl.style.top = this.fragmentOffsets[0];
        }
    }

    focusOnRte(e) {
        this.#currentRte = e.detail.rte;
    }

    updateFragment(e) {
        const fieldName = e.target.dataset.field;
        let value = e.target.value || e.detail.value;
        value = e.target.multiline ? value.split(',') : [value];
        this.store.fragment.updateField(fieldName, value);
        const merchDataSource = this.querySelector(
            `merch-datasource[path="${this.store.fragment.path}"]`,
        );
        merchDataSource.refresh(false);
    }

    async saveFragment() {
        this.showToast('Saving fragment...');
        try {
            await this.store.saveFragment();
            this.showToast('Fragment saved', 'positive');
        } catch (e) {
            this.showToast('Fragment could not be  saved', 'negative');
        }
    }

    async copyFragment() {
        this.showToast('Cloning fragment...');
        try {
            await this.store.copyFragment();
            this.showToast('Fragment cloned', 'positive');
        } catch (e) {
            this.showToast('Fragment could not be cloned', 'negative');
        }
    }

    closeFragmentEditor(e) {
        this.store.selectFragment();
    }

    closeConfirmSelect() {
        this.confirmSelect = false;
    }

    /**
     * @param {Event} e;
     */
    handleSearch(e) {
        this.searchText = this.search.value;
        if (e.type === EVENT_SUBMIT) {
            e.preventDefault();
            this.doSearch();
        }
    }

    closeOstDialog() {
        this.querySelector('sp-dialog-base').open = false;
    }

    async doSearch() {
        const query = this.searchText;
        const modelId = this.picker.value.replace('all', '');
        const path = '/content/dam/sandbox/mas';
        const search = { query, path, modelId };
        pushState(search);
        this.store.doSearch(search);
    }

    onSelect(offerSelectorId, type, offer, options, promoOverride) {
        const link = createMarkup(
            ostDefaults,
            offerSelectorId,
            type,
            offer,
            options,
            promoOverride,
        );

        console.log(`Use Link: ${link.outerHTML}`);

        this.#currentRte?.appendContent(link.outerHTML);

        this.closeOstDialog();
    }

    async editorActionClickHandler(e) {
        const ostRoot = document.getElementById('ost');
        const accessToken = window.adobeid.authorize();
        const searchParameters = new URLSearchParams();
        const clickedOffer = e.detail?.clickedElement;
        if (clickedOffer) {
            ['wcs-osi', 'template', 'promotion-code'].forEach((attr) => {
                const value = clickedOffer.getAttribute(`data-${attr}`);
                if (value) {
                    searchParameters.set(
                        attr
                            .replace('wcs-', '')
                            .replace('template', 'type')
                            .replace('promotion-code', 'promo'),
                        value,
                    );
                }
            });
        }
        window.ost.openOfferSelectorTool({
            ...ostDefaults,
            rootElement: ostRoot,
            zIndex: 20,
            aosAccessToken: accessToken,
            searchParameters,
            onSelect: this.onSelect.bind(this),
        });
    }
}

customElements.define('mas-studio', MasStudio);
