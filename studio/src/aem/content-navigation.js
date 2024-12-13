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
                height: 48px;
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
            repository: { type: Object, state: true },
            mode: { type: String, state: true },
        };
    }

    constructor() {
        super();
        this.mode = sessionStorage.getItem(MAS_RENDER_MODE) ?? 'render';
    }

    handleTopFolderChange(e) {
        this.repository.setPath(e.target.value);
        pushState({ path: e.target.value });
    }

    handleRenderModeChange(e) {
        this.mode = e.target.value;
        sessionStorage.setItem(MAS_RENDER_MODE, this.mode);
        [...this.children].forEach((child) => child.requestUpdate());
    }

    get topFolders() {
        if (this.repository.topFolders.length === 0) return nothing;
        return html`<sp-picker
            @change=${this.handleTopFolderChange}
            size="m"
            value="${this.repository.path}"
        >
            ${this.repository.topFolders.map(
                (folder) =>
                    html`<sp-menu-item value="${folder}">
                        ${folder.toUpperCase()}
                    </sp-menu-item>`,
            )}
        </sp-picker>`;
    }

    get searchInfo() {
        return html`<sp-icon-search></sp-icon-search> Search results for
            "${this.repository.searchText}"`;
    }

    render() {
        return html`<div id="toolbar">
                ${this.topFolders}
                <div class="divider"></div>
                ${this.actions}
            </div>
            ${this.repository.showFilterPanel
                ? html`<mas-filter-panel
                      .repository="${this.repository}"
                  ></mas-filter-panel>`
                : nothing}
            ${this.selectionActions}
            ${this.repository.searchText ? this.searchInfo : ''}
            <slot></slot> `;
    }

    get selectionActions() {
        const selectionCount = this.repository.selectionCount;
        const hasSingleSelection = styleMap({
            display: selectionCount === 1 ? 'flex' : 'none',
        });
        const hasSelection = styleMap({
            display: selectionCount > 0 ? 'flex' : 'none',
        });

        return html`<sp-action-bar
            emphasized
            ?open=${this.repository.inSelection}
            variant="fixed"
            @close=${() => this.repository.toggleSelectionMode(false)}
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
        if (this.repository.fragment) return nothing;
        return html`<mas-filter-toolbar
            .repository=${this.repository}
        ></mas-filter-toolbar>`;
    }

    get actions() {
        const inNoSelectionStyle = styleMap({
            display: !this.inSelection ? 'flex' : 'none',
        });
        const disabled = !!this.repository.fragment;
        return html`${this.toolbar}<sp-action-group emphasized>
                <slot name="toolbar-actions"></slot>
                <sp-action-button
                    emphasized
                    style=${inNoSelectionStyle}
                    disabled
                >
                    <sp-icon-new-item slot="icon"></sp-icon-new-item>
                    Create New Card
                </sp-action-button>
                <sp-action-button
                    style=${inNoSelectionStyle}
                    ?disabled=${disabled}
                    @click=${() => this.repository.toggleSelectionMode()}
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
                    placement="left-end"
                    @change=${this.handleRenderModeChange}
                >
                    ${this.renderActions}
                </sp-action-menu>
            </sp-action-group>`;
    }
}
customElements.define(
    'content-navigation',
    litObserver(ContentNavigation, ['repository']),
);
