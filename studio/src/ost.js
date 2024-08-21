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
};

const noPlaceholderCardVariants = ['ccd-action', 'ah'];

export const defaults = {
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

const updateParams = (params, key, value) => {
    if (value !== defaults[key]) {
        params.set(key, value);
    }
};

export const createMarkup = (
    defaults,
    offerSelectorId,
    type,
    offer,
    options,
    promo,
    cardVariant,
) => {
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
        if (noPlaceholderCardVariants.includes(cardVariant)) {
            ctaText = ctaTexts[ctaText];
        }
        span.textContent = ctaText;
        cta.appendChild(span);

        return cta;
    } else {
        const inlinePrice = document.createElement('span', {
            is: 'inline-price',
        });
        inlinePrice.setAttribute(
            'data-display-per-unit',
            options.displayPerUnit ?? 'false',
        );
        inlinePrice.setAttribute(
            'data-quantity',
            offer.ordering.max_quantity ?? '1',
        );
        inlinePrice.setAttribute('data-template', 'price');
        inlinePrice.setAttribute('data-wcs-osi', offerSelectorId);
        inlinePrice.innerHTML = '&nbsp;';
        return inlinePrice;
    }
};
