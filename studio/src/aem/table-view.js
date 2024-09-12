import { css, html, LitElement, nothing } from 'lit';

const MODE = 'table';

class TableView extends LitElement {
    static get styles() {
        return css`
            :host {
                display: contents;
            }

            sp-table {
                height: var(--table-height, 100%);
            }
        `;
    }

    static get properties() {
        return {
            rowCount: { type: Number, attribute: 'row-count' },
            customRenderItem: { type: Function },
        };
    }

    get table() {
        return this.shadowRoot?.querySelector('sp-table');
    }

    get tableBody() {
        return this.table?.querySelector('sp-table-body');
    }

    get selection() {
        return this.table.selected;
    }

    refreshItems() {
        this.requestUpdate();
        if (this.parentElement?.mode !== MODE) return;
        this.updateComplete.then(() => {
            this.updateTableSelection();
            if (!this.table) return;
            this.table.items = this.parentElement.source?.fragments;
        });
    }

    updateTableSelection() {
        if (!this.parentElement.inSelection) {
            this.table?.deselectAllRows();
        }
    }

    handleTableSelectionChange() {
        this.dispatchEvent(
            new CustomEvent('selection-change', {
                bubbles: true,
            }),
        );
    }

    canRender() {
        return this.parentElement?.mode === MODE && this.parentElement.source;
    }

    render() {
        // TODO check why table does not clear when fragments are empty
        if (!this.canRender()) return nothing;
        return html`
            <sp-table
                emphasized
                scroller
                .renderItem=${this.renderItem.bind(this)}
                selects=${this.parentElement.inSelection
                    ? 'multiple'
                    : undefined}
                @change=${this.handleTableSelectionChange}
            >
                <sp-table-head>
                    <sp-table-head-cell sortable>Title</sp-table-head-cell>
                    <sp-table-head-cell sortable>Name</sp-table-head-cell>
                    <slot name="headers"></slot>
                    <sp-table-head-cell sortable>Status</sp-table-head-cell>
                    <sp-table-head-cell sortable
                        >Modified at</sp-table-head-cell
                    >
                    <sp-table-head-cell sortable
                        >Modified by</sp-table-head-cell
                    >
                </sp-table-head>
            </sp-table>
        `;
    }

    renderItem(item) {
        if (!item) return nothing;
        return html` <sp-table-cell>${item.title}</sp-table-cell>
            <sp-table-cell>${item.name}</sp-table-cell>
            ${this.customRenderItem?.(item)}
            <sp-table-cell>${item.status}</sp-table-cell>
            <sp-table-cell>${item.modified.at}</sp-table-cell>
            <sp-table-cell>${item.modified.by}</sp-table-cell>`;
    }

    connectedCallback() {
        super.connectedCallback();

        // resize the table height based on the row count
        if (this.rowCount) {
            this.style.setProperty('--table-height', `${this.rowCount * 40}px`);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    get actionData() {
        return [
            'table',
            'Table view',
            html`<sp-icon-table slot="icon"></sp-icon-table>`,
        ];
    }

    get selectionCount() {
        return this.table?.selected?.length ?? 0;
    }
}

customElements.define('table-view', TableView);
