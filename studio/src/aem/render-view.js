import { html, LitElement, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './render-view-item.js';
import { litObserver } from 'picosm';

const MODE = 'render';

const models = {
    merchCard: {
        path: '/conf/mas/settings/dam/cfm/models/card',
        name: 'Merch Card',
    },
};

class RenderView extends LitElement {
    static get properties() {
        return {
            store: { type: Object, state: true },
        };
    }
    constructor() {
        super();
        this.tooltipTimeout = null;
    }

    createRenderRoot() {
        return this;
    }

    handleClick(e) {
        if (this.store.inSelection) return;
        clearTimeout(this.tooltipTimeout);
        const currentTarget = e.currentTarget;
        this.tooltipTimeout = setTimeout(() => {
            currentTarget.classList.add('has-tooltip');
        }, 500);
    }

    handleMouseLeave(e) {
        if (this.store.inSelection) return;
        clearTimeout(this.tooltipTimeout);
        e.currentTarget.classList.remove('has-tooltip');
    }

    handleDoubleClick(e, fragment) {
        if (this.store.inSelection) return;
        clearTimeout(this.tooltipTimeout);
        e.currentTarget.classList.remove('has-tooltip');
        this.store.selectFragment(e.clientX, fragment);
    }

    render() {
        if (this.parentElement.mode !== MODE) return nothing;
        return html` ${repeat(
            this.store.fragments,
            (fragment) => fragment.id,
            (fragment) =>
                html`<render-view-item
                    .store=${this.store}
                    .fragment=${fragment}
                ></render-view-item>`,
        )}`;
    }

    get actionData() {
        return [
            MODE,
            'Render view',
            html`<sp-icon-view-card slot="icon"></sp-icon-view-card>`,
        ];
    }
}

customElements.define('render-view', litObserver(RenderView, ['store']));
