import { html, LitElement, nothing } from 'lit';
import { EVENT_SUBMIT } from './events.js';
import { deeplink, pushState } from './deeplink.js';
import './editor-panel.js';
import './editors/merch-card-editor.js';
import './rte/rte-field.js';
import './rte/rte-link-editor.js';
import './mas-top-nav.js';
import { MasRepository } from './aem/mas-repository.js';
import { litObserver } from 'picosm';

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
    };

    constructor() {
        super();
        this.bucket = '';
        this.newFragment = null;
        this.variant = 'all';
        this.searchText = '';
        this.path = 'ccd';
        this.showToast = this.showToast.bind(this);
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
            changedProperties.has('variant')
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
        return html`
            <content-navigation
                .repository="${this.repository}"
                ?in-selection=${this.repository.inSelection}
            >
                <render-view .repository="${this.repository}"></render-view>
                <table-view .repository="${this.repository}"></table-view>
            </content-navigation>
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

    customRenderItem(item) {
        if (!item) return html`<sp-table-cell></sp-table-cell>`;
        return html` <sp-table-cell>${item.variant}</sp-table-cell>`;
    }

    render() {
        return html`
            <mas-top-nav env="${this.env}"></mas-top-nav>
            <side-nav></side-nav>
            ${this.content}${this.editorPanel} ${this.toast}
            ${this.loadingIndicator}
        `;
    }

    get toast() {
        return html`<sp-toast timeout="6000" popover></sp-toast>`;
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
