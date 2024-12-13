import { html, css, LitElement } from 'lit';

class MasFilterPanel extends LitElement {
    static properties = {
        repository: { type: Object, state: true },
    };
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 10px;
            align-self: flex-end;
        }
        sp-picker {
            width: 150px;
        }
    `;

    disconnectedCallback() {
        super.disconnectedCallback();
        this.repository.setTags([]);
    }

    handleFilterChange(event) {
        this.repository.setTags(event.target.value);
    }

    render() {
        return html`
            <aem-tag-picker-field
                label="Select filters"
                namespace="/content/cq:tags/mas"
                multiple
                @change=${this.handleFilterChange}
            ></aem-tag-picker-field>
        `;
    }
}

customElements.define('mas-filter-panel', MasFilterPanel);
