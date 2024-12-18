import { css, html, LitElement, nothing } from 'lit';
import { pushState } from './deeplink.js';
import { litObserver } from 'picosm';

export class MasFolderPicker extends LitElement {
    static get properties() {
        return {
            store: { type: Object, state: true },
        };
    }

    handleTopFolderChange(e) {
        this.store.setTopFolder(e.target.value);
        pushState({ path: e.target.value });
    }

    render() {
        if (this.store.topFolders.length === 0) return nothing;
        return html`<sp-icon
                size="xl"
                src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeD0nMCcgeT0nMCcgdmlld0JveD0nMCAwIDMwIDI2JyB3aWR0aD0nMThweCcgeG1sOnNwYWNlPSdwcmVzZXJ2ZScgcm9sZT0naW1nJyBhcmlhLWxhYmVsPSdBZG9iZSc+PHBhdGggZmlsbD0nIzI5MjkyOScgZD0nTTE5IDBoMTF2MjZ6TTExLjEgMEgwdjI2ek0xNSA5LjZMMjIuMSAyNmgtNC42bC0yLjEtNS4yaC01LjJ6Jz48L3BhdGg+PC9zdmc+"
            ></sp-icon>
            <sp-picker
                @change=${this.handleTopFolderChange}
                value="${this.store.topFolder}"
            >
                ${this.store.topFolders.map(
                    (folder) =>
                        html`<sp-menu-item value="${folder}">
                            ${folder.toUpperCase()}
                        </sp-menu-item>`,
                )}
            </sp-picker>`;
    }

    static get styles() {
        return css`
            :host {
                --mod-picker-background-color-default: rgb(248, 248, 248);
                --mod-picker-border-radius: 0;
                --mod-picker-border-width: 0;
                --mod-picker-background-color-default-open: none;
                --mod-picker-background-color-hover: none;
                --mod-picker-background-color-hover-open: none;
            }
        `;
    }
}

customElements.define(
    'mas-folder-picker',
    litObserver(MasFolderPicker, ['store']),
);
