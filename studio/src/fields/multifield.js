import { html, css, LitElement } from 'lit';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-drag-handle.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';

class MasMultifield extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .field-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid transparent;
            border-radius: 4px;
        }

        .field-wrapper.dragging {
            opacity: 0.5;
        }

        .field-wrapper.dragover {
            border: 1px dashed #007bff;
        }

        .field {
            flex-grow: 1;
            margin-right: 10px;
        }

        sp-icon-drag-handle {
            cursor: grab;
            pointer-events: auto;
            margin-right: 10px;
        }

        sp-icon-close {
            pointer-events: auto;
            padding: 8px;
            margin-block-start: 24px;
            align-self: start;
            cursor: pointer;
        }

        sp-icon-close:hover {
            cursor: pointer;
        }
    `;

    static get properties() {
        return {
            values: { type: Array },
            draggingIndex: { type: Number },
        };
    }

    /**
     * @type {HTMLElement}
     */
    #template;

    constructor() {
        super();
        this.draggingIndex = -1;
        this.initValues();
    }

    initValues() {
        this.values = this.values ?? [];
        // auto assign ids.
        this.values = this.values.map((field, i) => ({
            id: i.toString(),
            ...field,
        }));
    }

    firstUpdated() {
        this.initValues();
    }

    connectedCallback() {
        super.connectedCallback();
        this.initFieldTemplate();
        this.addEventListener('change', this.handleChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('change', this.handleChange);
    }

    // Initialize the field template
    initFieldTemplate() {
        const template = this.querySelector('template');
        if (!template) {
            console.warn('Template field not found', this);
        }
        this.#template = template.content;
        if (this.values.length === 0) {
            this.addField();
        }
    }

    // Add a new field
    addField() {
        this.values = [...this.values, { id: Date.now().toString() }];
    }

    // Remove a field by its id
    removeField(id) {
        this.values = this.values.filter((field) => field.id !== id);
    }

    // Handle the value change of a field
    handleChange(e) {
        if (e.detail === undefined) return;
        e.stopPropagation();
        const { id, value: newValue } = e.detail;
        console.log('Field value changed', id, newValue);
        const value = this.values.find((f) => f.id === id);
        if (!value) return;
        Object.assign(value, newValue);
        // Dispatch change event
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: this,
            }),
        );
    }

    // Handle drag start
    dragStart(e, index) {
        this.draggingIndex = index;
        e.dataTransfer.effectAllowed = 'move';
        e.target.classList.add('dragging');
    }

    // Handle drag over
    dragOver(e, index) {
        e.preventDefault();
        if (this.draggingIndex !== index) {
            e.target.classList.add('dragover');
        }
    }

    // Handle drag leave
    dragLeave(e) {
        e.target.classList.remove('dragover');
    }

    // Handle drop
    drop(e, index) {
        e.preventDefault();
        const draggingField = this.values[this.draggingIndex];

        // Remove the dragging field from its original position
        let updatedValues = [...this.values];
        updatedValues.splice(this.draggingIndex, 1);

        // Insert the dragging field into the new position
        updatedValues.splice(index, 0, draggingField);

        // Update the fields
        this.values = updatedValues;

        // Reset drag state
        e.target.classList.remove('dragover');
        this.draggingIndex = -1;
    }

    // Handle drag end
    dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    // Render individual field with reorder and delete options
    renderField(field, index) {
        const fieldEl = this.#template.cloneNode(true).firstElementChild;

        Object.keys(field).forEach((key) => {
            fieldEl.setAttribute(key, field[key]);
        });

        return html`
            <div
                class="field-wrapper"
                draggable="true"
                @dragstart=${(e) => this.dragStart(e, index)}
                @dragover=${(e) => this.dragOver(e, index)}
                @dragleave=${this.dragLeave}
                @drop=${(e) => this.drop(e, index)}
                @dragend=${this.dragEnd}
            >
                <sp-icon-drag-handle label="Order"></sp-icon-drag-handle>
                ${fieldEl}
                <sp-icon-close
                    label="Remove field"
                    @click=${() => this.removeField(field.id)}
                ></sp-icon-close>
            </div>
        `;
    }

    render() {
        return html`
            ${this.values.map((field, index) => this.renderField(field, index))}
            <sp-button @click=${this.addField}>Add</sp-button>
        `;
    }
}

customElements.define('mas-multifield', MasMultifield);
