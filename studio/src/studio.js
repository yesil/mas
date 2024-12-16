import { html, LitElement, nothing } from 'lit';
import { EVENT_SUBMIT } from './events.js';
import { deeplink, pushState } from './deeplink.js';
import './editor-panel.js';
import './editors/merch-card-editor.js';
import './rte/rte-field.js';
import './rte/rte-link-editor.js';
import './mas-top-nav.js';
import './mas-recently-updated.js';
import { MasRepository } from './aem/mas-repository.js';
import { litObserver } from 'picosm';
import { contentIcon } from './img/content-icon.js';
import { promosIcon } from './img/promos-icon.js';
import { ostIcon } from './img/ost-icon.js';

const BUCKET_TO_ENV = {
    e155390: 'qa',
    e59471: 'stage',
    e59433: 'prod',
};

class MasStudio extends LitElement {
    static properties = {
        bucket: { type: String, attribute: 'aem-bucket' },
        searchText: { type: String, state: true },
        baseUrl: { type: String, attribute: 'base-url' },
        path: { type: String, state: true },
        variant: { type: String, state: true },
        newFragment: { type: Object, state: true },
        repository: { type: Object, state: true },
        showEditorPanel: { type: Boolean, state: true },
        showSplash: { type: Boolean, state: true },
    };

    constructor() {
        super();
        this.bucket = '';
        this.newFragment = null;
        this.variant = 'all';
        this.searchText = '';
        this.path = 'ccd';
        this.showToast = this.showToast.bind(this);
        this.path = '';
        this.showEditorPanel = false;
        this.showSplash = true;
    }

    connectedCallback() {
        super.connectedCallback();
        this.registerListeners();
        this.startDeeplink();
        this.initRepository();
    }

    registerListeners() {
        // Listen for ESC key to close the fragment editor and quit selection mode
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.repository.fragment) {
                    this.repository.unselectFragment();
                    return;
                }
                this.repository.toggleSelectionMode(false);
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.deeplinkDisposer) {
            this.deeplinkDisposer();
        }
    }

    initRepository() {
        this.repository = new MasRepository({
            baseUrl: this.baseUrl,
            bucket: this.bucket,
            path: this.path ?? '',
        });
    }

    get search() {
        return this.contentNavigation?.toolbar?.search;
    }

    clearSearch() {
        this.searchText = '';
        pushState({
            query: undefined,
            path: this.path,
        });
    }

    updated(changedProperties) {
        if (changedProperties.has('searchText')) {
            this.repository.searchText = this.searchText;
        }
        if (changedProperties.has('path')) {
            this.repository.path = this.path;
        }
        if (
            changedProperties.has('searchText') ||
            changedProperties.has('path') ||
            changedProperties.has('variant') ||
            changedProperties.has('showSplash')
        ) {
            this.repository.setSearchText(this.searchText);
            this.repository.setPath(this.path);
        }
        this.adjustEditorPosition();
    }

    get contentNavigation() {
        return this.querySelector('content-navigation');
    }

    get env() {
        return BUCKET_TO_ENV[this.bucket] || 'proxy';
    }

    createRenderRoot() {
        return this;
    }

    get selectFragmentDialog() {
        return html`
            ${this.newFragment
                ? html`<sp-overlay type="modal" open>
                      <sp-dialog-wrapper
                          headline="You have unsaved changes!"
                          underlay
                          @confirm=${() =>
                              this.saveAndEditFragment(this.newFragment)}
                          @secondary="${() =>
                              this.editFragment(this.newFragment, true)}"
                          @cancel="${this.closeConfirmSelect}"
                          confirm-label="Save"
                          secondary-label="Discard"
                          cancel-label="Cancel"
                      >
                          <p>
                              Do you want to save your changes before selecting
                              another merch card?
                          </p>
                      </sp-dialog-wrapper>
                  </sp-overlay>`
                : nothing}
        `;
    }

    get content() {
        if (this.showSplash) return nothing;
        return html`
            <content-navigation
                .repository="${this.repository}"
                ?in-selection=${this.repository.inSelection}
            >
                <render-view .repository="${this.repository}"></render-view>
                <table-view .repository="${this.repository}"></table-view>
            </content-navigation>
            ${this.fragmentEditor} ${this.selectFragmentDialog} ${this.toast}
        `;
    }

    get editorPanel() {
        if (!this.repository.fragment) return nothing;
        return html`<editor-panel
            .showToast=${this.showToast}
            .repository=${this.repository}
            .fragment=${this.repository.fragment}
        ></editor-panel>`;
    }

    get recentlyUpdated() {
        return html`<mas-recently-updated .repository="${this.repository}">
        </mas-recently-updated>`;
    }

    customRenderItem(item) {
        if (!item) return html`<sp-table-cell></sp-table-cell>`;
        return html` <sp-table-cell>${item.variant}</sp-table-cell>`;
    }

    showContent() {
        this.showSplash = false;
    }

    openOst() {
        openOfferSelectorTool();
    }

    showHome() {
        this.showSplash = true;
    }

    get splashScreen() {
        if (!this.showSplash) return nothing;
        return html`
            <div
                class="${this.showSplash ? 'show' : 'hide'}"
                id="splash-container"
            >
                <h1>Welcome</h1>
                <div class="quick-actions">
                    <h2>Quick Actions</h2>
                    <div class="actions-grid">
                        <div
                            class="quick-action-card"
                            @click=${this.showContent}
                            heading="Go to Content"
                        >
                            <div slot="cover-photo">${contentIcon}</div>
                            <div slot="heading">Go To Content</div>
                        </div>
                        <div
                            class="quick-action-card"
                            @click=${this.viewPromotions}
                        >
                            <div slot="cover-photo">${promosIcon}</div>
                            <div slot="heading">View Promotions</div>
                        </div>
                        <div class="quick-action-card" @click=${this.openOst}>
                            <div slot="cover-photo">${ostIcon}</div>
                            <div slot="heading">Open Offer Selector Tool</div>
                        </div>
                    </div>
                </div>
                <div class="recently-updated">${this.recentlyUpdated}</div>
            </div>
        `;
    }

    render() {
        return html`
            <mas-top-nav env="${this.env}"></mas-top-nav>
            <div class="studio-content">
                <side-nav>
                    <div class="dropdown-container">
                        <mas-folder-picker
                            @picker-change=${this.handleFolderChange}
                        ></mas-folder-picker>
                    </div>
                    <sp-sidenav>
                        <sp-sidenav-item
                            label="Home"
                            value="home"
                            @click="${this.showHome}"
                            selected
                        >
                            <sp-icon-home slot="icon"></sp-icon-home>
                        </sp-sidenav-item>

                        <sp-sidenav-item label="Promotions" value="promotions">
                            <sp-icon-promote slot="icon"></sp-icon-promote>
                        </sp-sidenav-item>

                        <sp-sidenav-item label="Reporting" value="reporting">
                            <sp-icon-graph-bar-vertical
                                slot="icon"
                            ></sp-icon-graph-bar-vertical>
                        </sp-sidenav-item>

                        <sp-sidenav-divider></sp-sidenav-divider>

                        <sp-sidenav-item label="Support" value="support">
                            <sp-icon-help slot="icon"></sp-icon-help>
                        </sp-sidenav-item>
                    </sp-sidenav>
                </side-nav>
                <div class="content-container">
                    ${this.splashScreen}
                    <div class="content">${this.content}</div>
                    ${this.loadingIndicator}
                </div>
            </div>
        `;
    }

    get toast() {
        return html`<sp-toast timeout="6000" popover></sp-toast>`;
    }

    handleFolderChange(event) {
        const selectedValue = event.detail.value;
        document.dispatchEvent(
            new CustomEvent('folder-change', {
                detail: { value: selectedValue },
            }),
        );
        this.bucket = selectedValue;
        this.requestUpdate();
    }

    get loadingIndicator() {
        if (this.repository.status !== 'loading') return nothing;
        return html`<sp-progress-circle
            indeterminate
            size="l"
        ></sp-progress-circle>`;
    }

    get toastEl() {
        return this.querySelector('sp-toast');
    }

    startDeeplink() {
        this.deeplinkDisposer = deeplink(({ query, path }) => {
            this.searchText = query ?? '';
            if (path) {
                this.path = path;
            }
        });
    }

    showToast(message, variant = 'info') {
        const toast = this.toastEl;
        if (toast) {
            toast.textContent = message;
            toast.variant = variant;
            toast.open = true;
            toast.showPopover();
        }
    }

    /**
     * If the current fragment has unsaved changes, the user will be prompted to save them before editing the new fragment.
     * @param {Fragment} fragment
     * @param {boolean} force - discard unsaved changes
     */
    async editFragment(fragment, force = false) {
        if (fragment && fragment === this.repository.fragment) {
            this.requestUpdate();
            return;
        }
        if (this.repository.fragment?.hasChanges && !force) {
            this.newFragment = fragment;
        } else {
            this.newFragment = null;
            this.repository.setFragment(fragment);
        }
        this.requestUpdate();
    }

    async saveAndEditFragment(fragment) {
        await this.saveFragment();
        await this.editFragment(fragment, true);
    }

    async adjustEditorPosition() {
        if (this.repository.fragment) return;
        // reposition the editor
        const x = this.repository.fragmentPositionX;
        const viewportCenterX = window.innerWidth / 2;
        const left = x > viewportCenterX ? '0' : 'inherit';
        const right = x <= viewportCenterX ? '0' : 'inherit';
        this.style.setProperty('--editor-left', left);
        this.style.setProperty('--editor-right', right);
    }

    closeConfirmSelect() {
        this.newFragment = null;
    }

    handleSearch(e) {
        this.searchText = this.search.value;
        if (!this.searchText) {
            pushState({
                query: undefined,
                path: undefined,
            });
        }
        if (e.type === EVENT_SUBMIT) {
            e.preventDefault();
        }
    }

    handleVariantChange(e) {
        this.variant = e.target.value;
    }
}

customElements.define('mas-studio', litObserver(MasStudio, ['repository']));
