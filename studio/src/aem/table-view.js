import { css, html, LitElement, nothing } from 'lit';
import { litObserver } from 'picosm';

const MODE = 'table';

class TableView extends LitElement {
    static get styles() {
        return css`
            :host {
                display: contents;
            }

            sp-table {
                height: var(--table-height, 100%);
                margin: 20px 16px;
            }
        `;
    }

    static get properties() {
        return {
            rowCount: { type: Number, attribute: 'row-count' },
            customRenderItem: { type: Function },
            repository: { type: Object, state: true },
        };
    }

    constructor() {
        super();
        this.itemValue = this.itemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    get table() {
        return this.shadowRoot?.querySelector('sp-table');
    }

    get tableBody() {
        return this.table?.querySelector('sp-table-body');
    }

    render() {
        if (this.parentElement.mode !== MODE) return nothing;
        if (this.repository.fragments.length === 0) return nothing;
        return html`
            <sp-table
                emphasized
                scroller
                .itemValue=${this.itemValue}
                .renderItem=${this.renderItem}
                selects=${this.repository.inSelection ? 'multiple' : undefined}
                @change=${this.handleTableSelectionChange}
                @dblclick="${this.handleDoubleClick}"
            >
                <sp-table-head>
                    <sp-table-head-cell sortable>Title</sp-table-head-cell>
                    <sp-table-head-cell sortable>Name</sp-table-head-cell>
                    <sp-table-head-cell sortable>Variant</sp-table-head-cell>
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

    updated() {
        if (!this.table) return;
        if (!this.repository.inSelection) {
            this.table.deselectAllRows();
        } else if (
            this.table.selected.length === 0 &&
            this.repository.selectedFragmentsIds
        ) {
            this.table.selected = this.repository.selectedFragmentsIds;
        }
        this.table.items = this.repository.fragments;
        this.table.renderVirtualizedItems(); /* hack: force to render when items.lenght = 0 */
    }

    itemValue(item) {
        return item.id;
    }

    renderItem(item) {
        if (!item) return nothing;
        return html` <sp-table-cell>${item.title}</sp-table-cell>
            <sp-table-cell>${item.name}</sp-table-cell>
            <sp-table-cell>${item.variant}</sp-table-cell>
            <sp-table-cell>${item.status}</sp-table-cell>
            <sp-table-cell>${item.modified.at}</sp-table-cell>
            <sp-table-cell>${item.modified.by}</sp-table-cell>`;
    }

    handleDoubleClick(e) {
        if (this.repository.inSelection) return;
        const { value } = e.target.closest('sp-table-row');
        if (!value) return;
        const fragment = this.repository.fragments.find((f) => f.id === value);
        if (!fragment) return;
        this.repository.selectFragment(e.clientX, fragment);
    }

    connectedCallback() {
        super.connectedCallback();

        // resize the table height based on the row count
        if (this.rowCount) {
            this.style.setProperty('--table-height', `${this.rowCount * 40}px`);
        }
    }

    handleTableSelectionChange(e) {
        this.repository.fragments.forEach((fragment) => {
            const selected = e.target.selected.includes(fragment.id);
            if (
                (selected && !fragment.selected) ||
                (!selected && fragment.selected)
            ) {
                this.repository.toggleFragmentSelection(fragment);
            }
        });
    }

    get actionData() {
        return [
            'table',
            'Table view',
            html`<sp-icon-table slot="icon"></sp-icon-table>`,
        ];
    }
}

customElements.define('table-view', litObserver(TableView, ['repository']));
