import { html, css, LitElement, nothing } from 'lit';
import { getCountryCodes, getCountryName, getCountryFlag } from './locales.js';

export class MasCountryPicker extends LitElement {
    static properties = {
        countries: { type: String },
        selectionLabel: { type: String, attribute: 'selection-label' },
        emptySelectionLabel: { type: String, attribute: 'empty-selection-label' },
        emptySelectionIsValue: { type: Boolean, attribute: 'empty-selection-is-value' },
        disabled: { type: Boolean },
        dialogOpen: { type: Boolean, state: true },
        selectedCountries: { type: Array, state: true },
        tempSelectedCountries: { type: Array, state: true },
        searchQuery: { type: String, state: true },
    };

    static styles = css`
        .selection-trigger {
            align-items: center;
            appearance: none;
            background: var(--palette-gray-25, #ffffff);
            border: 2px solid var(--alias-border-disabled-default, #dadada);
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            font-family: 'Adobe Clean', sans-serif;
            font-size: 14px;
            gap: 6px;
            height: 32px;
            justify-content: space-between;
            line-height: 18px;
            padding: 0 11px 0 12px;
            width: 100%;
        }

        .selection-trigger:disabled {
            cursor: not-allowed;
        }

        .selection-trigger:focus-visible {
            outline: none;
        }

        .selection-trigger-label {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .selection-trigger-label.is-placeholder {
            color: var(--spectrum-gray-600);
        }

        .selection-trigger-chevron {
            color: var(--palette-gray-700, #505050);
            flex-shrink: 0;
        }

        sp-underlay:not([open]) + sp-dialog.selection-dialog {
            display: none;
        }

        sp-underlay + sp-dialog.selection-dialog {
            position: fixed;
            border-radius: 16px;
            z-index: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 684px;
            max-width: calc(100vw - 32px);
            max-height: calc(100vh - 32px);
            background: var(--spectrum-white, #ffffff);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .selection-dialog-content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 50vh;
            min-height: 0;
            overflow: hidden;
        }

        .selection-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .selection-count {
            font-size: 12px;
            color: var(--spectrum-gray-700, #464646);
            white-space: nowrap;
        }

        .checkbox-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
            column-gap: 12px;
            row-gap: 4px;
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            padding: 4px 0;
            align-content: start;
        }

        .checkbox-item {
            min-width: 0;
            padding: 4px 0;
        }

        sp-search {
            display: block;
            padding-bottom: 12px;
            width: 100%;
            --mod-search-border-color-default: var(--spectrum-gray-400, #a9a9a9ff);
            --mod-search-border-radius: 16px;
            --mod-search-border-width: 2px;
        }
    `;

    constructor() {
        super();
        this.countries = '';
        this.selectionLabel = 'Select countries';
        this.emptySelectionLabel = '';
        this.emptySelectionIsValue = false;
        this.disabled = false;
        this.dialogOpen = false;
        this.selectedCountries = [];
        this.tempSelectedCountries = [];
        this.searchQuery = '';
    }

    #tempSelectedSet = new Set();

    connectedCallback() {
        super.connectedCallback();
        this.selectedCountries = this.#parseCountries(this.countries);
    }

    #parseCountries(value) {
        if (!value) return [];
        if (Array.isArray(value)) return value.filter(Boolean);
        return String(value)
            .split(',')
            .map((c) => c.trim().toUpperCase())
            .filter(Boolean);
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('countries')) {
            this.selectedCountries = this.#parseCountries(this.countries);
        }
        if (changedProperties.has('tempSelectedCountries')) {
            this.#tempSelectedSet = new Set(this.tempSelectedCountries);
        }
    }

    #allCodes() {
        return getCountryCodes();
    }

    #filteredCodes() {
        if (!this.searchQuery) return this.#allCodes();
        const q = this.searchQuery.toLowerCase();
        return this.#allCodes().filter(
            (code) => code.toLowerCase().includes(q) || getCountryName(code).toLowerCase().includes(q),
        );
    }

    get #allFilteredSelected() {
        const filtered = this.#filteredCodes();
        return filtered.length > 0 && filtered.every((code) => this.#tempSelectedSet.has(code));
    }

    get #someFilteredSelected() {
        const filtered = this.#filteredCodes();
        return filtered.length > 0 && filtered.some((code) => this.#tempSelectedSet.has(code));
    }

    get #selectionCountLabel() {
        const count = this.tempSelectedCountries.length;
        return count === 1 ? '1 country selected' : `${count} countries selected`;
    }

    get #triggerText() {
        if (!this.selectedCountries.length) {
            return this.emptySelectionLabel || this.selectionLabel;
        }
        return this.selectedCountries.map((code) => `${getCountryFlag(code)} ${getCountryName(code)} (${code})`).join(', ');
    }

    get #triggerIsPlaceholder() {
        return this.selectedCountries.length === 0 && !this.emptySelectionIsValue;
    }

    #handleOpenDialog() {
        if (this.disabled) return;
        this.searchQuery = '';
        this.tempSelectedCountries = [...this.selectedCountries];
        this.dialogOpen = true;
    }

    #handleCancelDialog() {
        this.dialogOpen = false;
        this.tempSelectedCountries = [];
        this.searchQuery = '';
    }

    #handleApplyDialog() {
        const selected = [...new Set(this.tempSelectedCountries)];
        this.selectedCountries = selected;
        this.countries = selected.join(',');
        this.dialogOpen = false;
        this.tempSelectedCountries = [];
        this.searchQuery = '';

        this.dispatchEvent(
            new CustomEvent('countries-changed', {
                detail: { countries: selected },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleCheckbox(event) {
        event.stopPropagation();
        const checkbox = event.composedPath?.()[0] || event.target;
        const checked = checkbox?.checked;
        const value = checkbox?.value || checkbox?.getAttribute?.('value');
        if (!value) return;

        const selected = [...this.tempSelectedCountries];
        const index = selected.indexOf(value);
        if (checked && index === -1) {
            selected.push(value);
        } else if (!checked && index !== -1) {
            selected.splice(index, 1);
        }
        this.tempSelectedCountries = selected;
    }

    #handleSelectAll(event) {
        event.stopPropagation();
        const checkbox = event.composedPath?.()[0] || event.target;
        const checked = !!checkbox?.checked;
        const filtered = this.#filteredCodes();
        const selectedSet = new Set(this.tempSelectedCountries);
        if (checked) {
            filtered.forEach((code) => selectedSet.add(code));
        } else {
            filtered.forEach((code) => selectedSet.delete(code));
        }
        this.tempSelectedCountries = [...selectedSet];
    }

    #handleSearch(event) {
        this.searchQuery = event.target.value;
    }

    #renderCheckbox(code) {
        return html`
            <sp-checkbox
                class="checkbox-item"
                value=${code}
                ?checked=${this.#tempSelectedSet.has(code)}
                @change=${this.#handleCheckbox}
            >
                ${getCountryFlag(code)} ${getCountryName(code)} (${code})
            </sp-checkbox>
        `;
    }

    get #dialogTemplate() {
        if (!this.dialogOpen) return nothing;
        return html`
            <sp-underlay open @click=${this.#handleCancelDialog}></sp-underlay>
            <sp-dialog class="selection-dialog" open @click=${(e) => e.stopPropagation()}>
                <h2 slot="heading">${this.selectionLabel}</h2>
                <div class="selection-dialog-content">
                    <sp-search
                        placeholder="Search country"
                        .value=${this.searchQuery}
                        @input=${this.#handleSearch}
                        @click=${(e) => e.stopPropagation()}
                    ></sp-search>
                    <div class="selection-controls">
                        <sp-checkbox
                            value="all"
                            ?checked=${this.#allFilteredSelected}
                            .indeterminate=${this.#someFilteredSelected && !this.#allFilteredSelected}
                            @change=${this.#handleSelectAll}
                        >
                            Select all
                        </sp-checkbox>
                        <span class="selection-count">${this.#selectionCountLabel}</span>
                    </div>
                    <div class="checkbox-list">${this.#filteredCodes().map((code) => this.#renderCheckbox(code))}</div>
                </div>
                <sp-button slot="button" variant="secondary" @click=${this.#handleCancelDialog}>Cancel</sp-button>
                <sp-button slot="button" variant="accent" @click=${this.#handleApplyDialog}>Apply</sp-button>
            </sp-dialog>
        `;
    }

    render() {
        return html`
            <button type="button" class="selection-trigger" ?disabled=${this.disabled} @click=${this.#handleOpenDialog}>
                <span class="selection-trigger-label ${this.#triggerIsPlaceholder ? 'is-placeholder' : ''}">
                    ${this.#triggerText}
                </span>
                <sp-icon-chevron-down class="selection-trigger-chevron"></sp-icon-chevron-down>
            </button>
            ${this.#dialogTemplate}
        `;
    }
}

customElements.define('mas-country-picker', MasCountryPicker);
