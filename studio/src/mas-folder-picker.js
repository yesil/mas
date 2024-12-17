import { html, LitElement, nothing } from 'lit';
import { pushState } from './deeplink.js';
import { litObserver } from 'picosm';

export class MasFolderPicker extends LitElement {
    static get properties() {
        return {
            repository: { type: Object, state: true },
        };
    }

    handleTopFolderChange(e) {
        this.repository.setPath(e.target.value);
        pushState({ path: e.target.value });
    }

    render() {
        if (this.repository.topFolders.length === 0) return nothing;
        return html`<sp-picker
            @change=${this.handleTopFolderChange}
            quiet
            size="m"
            value="${this.repository.topFolder}"
        >
            ${this.repository.topFolders.map(
                (folder) =>
                    html`<sp-menu-item value="${folder}">
                        ${folder.toUpperCase()}
                    </sp-menu-item>`,
            )}
        </sp-picker>`;
    }
}

customElements.define(
    'mas-folder-picker',
    litObserver(MasFolderPicker, ['repository']),
);
