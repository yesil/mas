import { html } from 'lit';

let ostRoot;

const ctaTexts = {
    'buy-now': 'Buy now',
    'free-trial': 'Free trial',
    'start-free-trial': 'Start free trial',
    'get-started': 'Get started',
    'choose-a-plan': 'Choose a plan',
    'learn-more': 'Learn more',
    'change-plan-team-plans': 'Change Plan Team Plans',
    upgrade: 'Upgrade',
    'change-plan-team-payment': 'Change Plan Team Payment',
    'take-the-quiz': 'Take the quiz',
    'see-more': 'See more',
    'upgrade-now': 'Upgrade now',
    'save-now': 'Save now',
};

const noPlaceholderCardVariants = ['ccd-action', 'ah'];

export const ostDefaults = {
    aosApiKey: 'wcms-commerce-ims-user-prod',
    checkoutClientId: 'creative',
    country: 'US',
    environment: 'PROD',
    landscape: 'PUBLISHED',
    language: 'en',
    searchParameters: {},
    searchOfferSelectorId: null,
    defaultPlaceholderOptions: {
        displayRecurrence: true,
        displayPerUnit: true,
        displayTax: false,
        displayOldPrice: false,
        forceTaxExclusive: true,
    },
    wcsApiKey: 'wcms-commerce-ims-ro-user-cc',
    ctaTextOption: {
        ctaTexts: Object.entries(ctaTexts).map(([id, name]) => ({ id, name })),
        getDefaultText() {
            return this.ctaTexts[0].id;
        },

        getTexts() {
            return this.ctaTexts;
        },

        getSelectedText(searchParameters) {
            const ctaLabel = searchParameters.get('text');
            return !!ctaLabel &&
                this.ctaTexts.find((label) => label.id === ctaLabel)
                ? ctaLabel
                : this.getDefaultText();
        },
    },
};

export const createMarkup = (offerSelectorId, type, offer, options, promo) => {
    const isCta = !!type?.startsWith('checkout');

    if (isCta) {
        const cta = document.createElement('a', { is: 'checkout-link' });
        cta.setAttribute('data-checkout-workflow', options.workflow);
        cta.setAttribute(
            'data-checkout-workflow-step',
            options.workflowStep ?? 'segmentation',
        );
        cta.setAttribute('data-promotion-code', promo ?? '');
        cta.setAttribute('data-quantity', '1');
        cta.setAttribute('data-wcs-osi', offerSelectorId);

        cta.href = '#';

        const span = document.createElement('span');
        let ctaText = options.ctaText ?? 'buy-now';
        if (noPlaceholderCardVariants.includes(currentVariant)) {
            ctaText = ctaTexts[ctaText];
        }
        span.textContent = ctaText;
        cta.appendChild(span);

        return cta;
    } else {
        const inlinePrice = document.createElement('span', {
            is: 'inline-price',
        });

        if (options.displayPerUnit)
            inlinePrice.setAttribute(
                'data-display-per-unit',
                options.displayPerUnit ?? 'false',
            );

        if (options.displayRecurrence)
            inlinePrice.removeAttribute('data-display-recurrence'); // by default.
        else inlinePrice.setAttribute('data-display-recurrence', false);

        if (options.displayTax)
            inlinePrice.setAttribute('data-display-tax', true);
        else inlinePrice.removeAttribute('data-display-tax');

        if (offer.isPerpetual) inlinePrice.setAttribute('data-perpetual', true);
        else inlinePrice.removeAttribute('data-perpetual');

        if (promo) inlinePrice.setAttribute('data-promotion-code', promo);
        else inlinePrice.removeAttribute('data-promotion-code');

        if (options.forceTaxExclusive)
            inlinePrice.setAttribute('data-tax-exclusive', true);
        else inlinePrice.removeAttribute('data-tax-exclusive');

        inlinePrice.setAttribute(
            'data-display-old-price',
            options.displayOldPrice ?? 'false',
        );

        inlinePrice.setAttribute(
            'data-quantity',
            offer.ordering.max_quantity ?? '1',
        );

        inlinePrice.setAttribute('data-template', type);
        inlinePrice.setAttribute('data-wcs-osi', offerSelectorId);
        inlinePrice.innerHTML = '&nbsp;';
        return inlinePrice;
    }
};

export function onSelect(offerSelectorId, type, offer, options, promoOverride) {
    const link = createMarkup(
        offerSelectorId,
        type,
        offer,
        options,
        promoOverride,
    );
    ostRoot.dispatchEvent(new CustomEvent('use', { detail: link }));
}

export function getOffferSelectorTool() {
    return html`
        <sp-overlay id="ostDialog" type="modal">
            <sp-dialog-wrapper dismissable underlay>
                <div id="ost"></div>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
}

export function openOfferSelectorTool(clickedOffer) {
    ostRoot ??= document.createElement('div');
    let searchOfferSelectorId;
    const aosAccessToken =
        localStorage.getItem('masAccessToken') ?? window.adobeid.authorize();
    const searchParameters = new URLSearchParams();
    const defaultPlaceholderOptions = {
        ...ostDefaults.defaultPlaceholderOptions,
    };
    if (clickedOffer) {
        searchOfferSelectorId = clickedOffer.getAttribute('data-wcs-osi');
        Object.assign(defaultPlaceholderOptions, clickedOffer.dataset);
    }
    window.ost.openOfferSelectorTool({
        ...ostDefaults,
        rootElement: ostRoot,
        zIndex: 20,
        aosAccessToken,
        searchParameters,
        searchOfferSelectorId,
        defaultPlaceholderOptions,
        onSelect,
    });
    return ostRoot;
}

export function watchReactSpectrumPopovers() {
    // Config for both observers
    const config = {
        attributes: false,
        childList: true,
        subtree: true,
    };

    // Create mutation observer
    const mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            const nodes = Array.from(mutation.addedNodes);
            for (const node of nodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node;
                    if (element.classList.contains('JuTe6q_spectrum')) {
                        const popoverElement = element.querySelector(
                            '.cH0MeW_spectrum-Popover',
                        );
                        if (!popoverElement) return;
                        popoverElement.setAttribute('popover', 'manual');
                        popoverElement.showPopover();
                        return;
                    }
                }
            }
        }
    });

    // Start observing with mutation observer
    mutationObserver.observe(document.body, config);

    // Return cleanup function
    return () => {
        mutationObserver.disconnect();
    };
}
