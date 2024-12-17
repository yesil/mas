import { css, html, LitElement, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { pushState } from '../deeplink.js';
import './mas-filter-panel.js';
import './mas-filter-toolbar.js';
import { litObserver } from 'picosm';

const MAS_RENDER_MODE = 'mas-render-mode';

class ContentNavigation extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                padding: 0 10px;
            }

            #toolbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                gap: 10px;
                flex-wrap: wrap;
            }

            mas-filter-panel {
            }

            .divider {
                flex: 1;
            }

            sp-action-bar {
                display: none;
                flex: 1;
            }

            sp-action-bar[open] {
                display: flex;
            }
        `;
    }

    static get properties() {
        return {
            store: { type: Object, state: true },
            mode: { type: String, state: true },
        };
    }

    constructor() {
        super();
        this.mode = sessionStorage.getItem(MAS_RENDER_MODE) ?? 'render';
    }

    handleRenderModeChange(e) {
        this.mode = e.target.value;
        sessionStorage.setItem(MAS_RENDER_MODE, this.mode);
        [...this.children].forEach((child) => child.requestUpdate());
    }

    get searchInfo() {
        return html`<sp-icon-search></sp-icon-search> Search results for
            "${this.store.searchText}"`;
    }

    get filterPanel() {
        if (!this.store.showFilterPanel) return nothing;
        return html` <mas-filter-panel
            .store="${this.store}"
        ></mas-filter-panel>`;
    }

    render() {
        return html`<div id="toolbar">${this.actions}</div>
            ${this.filterPanel} ${this.selectionActions}
            ${this.store.searchText ? this.searchInfo : ''}
            <slot></slot> `;
    }

    get selectionActions() {
        const selectionCount = this.store.selectionCount;
        const hasSingleSelection = styleMap({
            display: selectionCount === 1 ? 'flex' : 'none',
        });
        const hasSelection = styleMap({
            display: selectionCount > 0 ? 'flex' : 'none',
        });

        return html`<sp-action-bar
            emphasized
            ?open=${this.store.inSelection}
            variant="fixed"
            @close=${() => this.store.toggleSelectionMode(false)}
        >
            ${selectionCount} selected
            <sp-action-button
                slot="buttons"
                style=${hasSingleSelection}
                label="Duplicate"
                disabled
            >
                <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                <sp-tooltip self-managed placement="top">Duplicate</sp-tooltip>
            </sp-action-button>
            <sp-action-button
                slot="buttons"
                style=${hasSelection}
                label="Delete"
                disabled
            >
                <sp-icon-delete-outline slot="icon"></sp-icon-delete-outline>
                <sp-tooltip self-managed placement="top">Delete</sp-tooltip>
            </sp-action-button>
            <sp-action-button
                slot="buttons"
                style=${hasSelection}
                label="Publish"
                disabled
            >
                <sp-icon-publish-check slot="icon"></sp-icon-publish-check>
                <sp-tooltip self-managed placement="top">Publish</sp-tooltip>
            </sp-action-button>
            <sp-action-button
                slot="buttons"
                style=${hasSelection}
                label="Unpublish"
                disabled
            >
                <sp-icon-publish-remove slot="icon"></sp-icon-publish-remove>
                <sp-tooltip self-managed placement="top">Unpublish</sp-tooltip>
            </sp-action-button>
        </sp-action-bar>`;
    }

    get renderActions() {
        return [...this.children]
            .filter((child) => child.actionData)
            .map(
                ({ actionData: [mode, label, icon] }) =>
                    html`<sp-menu-item value="${mode}"
                        >${icon} ${label}</sp-menu-item
                    >`,
            );
    }

    get toolbar() {
        return html`<mas-filter-toolbar
            .store=${this.store}
        ></mas-filter-toolbar>`;
    }

    get actions() {
        const inNoSelectionStyle = styleMap({
            display: !this.inSelection ? 'flex' : 'none',
        });
        const disabled = !!this.store.fragment;
        return html`${this.toolbar}<sp-action-group emphasized>
                <sp-action-button
                    emphasized
                    style=${inNoSelectionStyle}
                    disabled
                >
                    <sp-icon-add slot="icon"></sp-icon-add>
                    Create New Card
                </sp-action-button>
                <sp-action-button
                    style=${inNoSelectionStyle}
                    ?disabled=${disabled}
                    @click=${() => this.store.toggleSelectionMode()}
                >
                    <sp-icon-selection-checked
                        slot="icon"
                    ></sp-icon-selection-checked>
                    Select
                </sp-action-button>
                <sp-action-menu
                    style=${inNoSelectionStyle}
                    selects="single"
                    ?disabled=${disabled}
                    value="${this.mode}"
                    @change=${this.handleRenderModeChange}
                >
                    ${this.renderActions}
                </sp-action-menu>
            </div>`;
    }
}
customElements.define(
    'content-navigation',
    litObserver(ContentNavigation, ['store']),
);
