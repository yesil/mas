import { html, LitElement } from 'lit';
import { litObserver, observe, subscribe } from 'picosm';

class RenderViewItem extends LitElement {
    static properties = {
        store: {
            type: Object,
            state: true,
        },
        fragment: {
            type: Object,
            state: true,
        },
    };

    #unobserve;
    #unsubscribe;

    createRenderRoot() {
        return this;
    }

    get aemFragment() {
        return this.querySelector('aem-fragment');
    }

    renderFragment(force) {
        if (this.fragment.hasChanges || force) {
            this.aemFragment.refresh(false);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.#unobserve = observe(
            this.fragment,
            () => this.renderFragment(),
            300,
        );
        this.#unsubscribe = subscribe(this.fragment, (message) => {
            if (message === 'discard') {
                this.renderFragment(true);
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#unobserve();
        this.#unsubscribe();
    }

    handleClick(e) {
        clearTimeout(this.tooltipTimeout);
        const currentTarget = e.currentTarget;
        this.tooltipTimeout = setTimeout(() => {
            currentTarget.classList.add('has-tooltip');
        }, 500);
    }

    handleMouseLeave(e) {
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
        return html`<div
            class="render-card ${this.fragment.selected ? 'selected' : ''}"
            @click="${this.handleClick}"
            @mouseleave="${this.handleMouseLeave}"
            @dblclick="${(e) => this.handleDoubleClick(e, this.fragment)}"
        >
            <div class="render-card-header">
                <div class="render-card-actions"></div>
                <mas-fragment-status
                    variant=${this.fragment.statusVariant}
                ></mas-fragment-status>
            </div>
            <overlay-trigger placement="top"
                ><merch-card
                    @click=${(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    slot="trigger"
                >
                    <aem-fragment
                        fragment="${this.fragment.id}"
                        ims
                        author
                    ></aem-fragment>
                    <div
                        class="overlay"
                        @click=${() =>
                            this.store.toggleFragmentSelection(this.fragment)}
                    >
                        <sp-icon-remove size="l"></sp-icon-remove>
                        <sp-icon-add size="l"></sp-icon-add>
                    </div>
                </merch-card>
                <sp-tooltip slot="hover-content" placement="top"
                    >Double click the card to start editing.</sp-tooltip
                >
            </overlay-trigger>
        </div>`;
    }
}

customElements.define(
    'render-view-item',
    litObserver(RenderViewItem, ['fragment']),
);
