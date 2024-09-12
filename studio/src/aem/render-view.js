import { html, LitElement, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

const MODE = 'render';

const models = {
    merchCard: {
        path: '/conf/mas/settings/dam/cfm/models/card',
        name: 'Merch Card',
    },
};

class RenderView extends LitElement {
    createRenderRoot() {
        return this;
    }

    refreshItems() {
        this.requestUpdate();
    }

    renderItem(fragment) {
        return html`<merch-card
            class="${fragment.isSelected ? 'selected' : ''}"
            @dblclick="${(e) =>
                this.parentElement.source.openFragment(
                    e.clientX,
                    e.clientY,
                    fragment,
                )}"
        >
            <merch-datasource
                aem-bucket="${this.parentElement.source.bucket}"
                path="${fragment.path}"
            ></merch-datasource>
            <sp-status-light
                size="l"
                variant="${fragment.statusVariant}"
            ></sp-status-light>
            <div
                class="overlay"
                @click="${() => this.handleSelectionChange(fragment)}"
            >
                <sp-icon-add slot="icon"></sp-icon-add>
            </div>
        </merch-card>`;
    }

    canRender() {
        return (
            this.parentElement?.mode === MODE &&
            this.parentElement.source?.fragments
        );
    }

    render() {
        if (!this.canRender()) return nothing;
        // TODO make me generic
        return html` ${repeat(
            this.parentElement.source.fragments,
            (fragment) => fragment.path,
            (fragment) => {
                switch (fragment.model.path) {
                    case models.merchCard.path:
                        return this.renderItem(fragment);
                    default:
                        return nothing;
                }
            },
        )}`;
    }

    get selection() {
        return [];
    }

    get actionData() {
        return [
            MODE,
            'Render view',
            html`<sp-icon-view-card slot="icon"></sp-icon-view-card>`,
        ];
    }

    handleSelectionChange(fragment) {
        fragment.toggleSelect();
        this.requestUpdate();
        this.dispatchEvent(
            new CustomEvent('selection-change', {
                bubbles: true,
            }),
        );
    }

    get selectionCount() {
        return (
            this.parentElement.source.fragments.filter(
                (fragment) => fragment.isSelected,
            ).length ?? 0
        );
    }
}

customElements.define('render-view', RenderView);
