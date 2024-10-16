import { html, css, LitElement } from 'lit';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-drag-handle.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import { EVENT_CHANGE } from '../events.js';

class MasMultifield extends LitElement {
    static get properties() {
        return {
            value: { type: Array },
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
        this.initValue();
    }

    initValue() {
        // auto assign ids.
        this.value =
            this.value?.map((field, i) => ({
                id: i.toString(),
                ...field,
            })) ?? [];
    }

    firstUpdated() {
        this.initValue();
    }

    connectedCallback() {
        super.connectedCallback();
        this.initFieldTemplate();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    // Initialize the field template
    initFieldTemplate() {
        const template = this.querySelector('template');
        if (!template) {
            console.warn('Template field not found', this);
        }
        this.#template = template.content;
        if (this.value.length === 0) {
            this.addField();
        }
    }

    // Add a new field
    addField() {
        this.value = [...this.value, { id: Date.now().toString() }];
        this.#changed();
    }

    // Remove a field by its id
    removeField(id) {
        this.value = this.value.filter((field) => field.id !== id);
        this.#changed();
    }

    #changed() {
        this.dispatchEvent(
            new CustomEvent(EVENT_CHANGE, {
                bubbles: true,
                composed: true,
            }),
        );
    }

    // Handle the value change of a field
    handleChange(e) {
        e.stopPropagation();
        const { id, value: newValue } = e.detail;
        const value = this.value.find((f) => f.id === id);
        if (!value) return;
        Object.assign(value, newValue);
        // Dispatch change event
        this.#changed();
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
        const draggingField = this.value[this.draggingIndex];

        // Remove the dragging field from its original position
        let updatedValue = [...this.value];
        updatedValue.splice(this.draggingIndex, 1);

        // Insert the dragging field into the new position
        updatedValue.splice(index, 0, draggingField);

        // Update the fields
        this.value = updatedValue;

        // Reset drag state
        e.target.classList.remove('dragover');
        this.draggingIndex = -1;
        this.#changed();
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
                ${fieldEl}
                <sp-icon-close
                    label="Remove field"
                    @click=${() => this.removeField(field.id)}
                ></sp-icon-close>
                <sp-icon-drag-handle label="Order"></sp-icon-drag-handle>
            </div>
        `;
    }

    render() {
        return html`
            <div @change="${this.handleChange}">
                ${this.value.map((field, index) =>
                    this.renderField(field, index),
                )}
                <sp-action-button quiet @click=${this.addField}>
                    <sp-icon-add label="Add" slot="icon"></sp-icon-add>Add
                </sp-action-button>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
        }

        :host > div {
            display: contents;
        }

        .field-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            border-radius: 4px;
        }

        .field-wrapper > *:first-child {
            flex: 1;
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
            visibility: hidden;
            margin-block-start: 24px;
            cursor: grab;
            pointer-events: auto;
        }

        .field-wrapper:hover sp-icon-drag-handle {
            visibility: visible;
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
}

customElements.define('mas-multifield', MasMultifield);
