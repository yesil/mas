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
        ctaTexts: [
            { id: 'buy-now', name: 'Buy now' },
            { id: 'free-trial', name: 'Free trial' },
            { id: 'start-free-trial', name: 'Start free trial' },
            { id: 'get-started', name: 'Get started' },
            { id: 'choose-a-plan', name: 'Choose a plan' },
            { id: 'learn-more', name: 'Learn more' },
            { id: 'change-plan-team-plans', name: 'Change Plan Team Plans' },
            { id: 'upgrade', name: 'Upgrade' },
            {
                id: 'change-plan-team-payment',
                name: 'Change Plan Team Payment',
            },
            { id: 'take-the-quiz', name: 'Take the quiz' },
            { id: 'see-more', name: 'See more' },
            { id: 'upgrade-now', name: 'Upgrade now' },
        ],

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

export const createMarkup = (  defaults,
    offerSelectorId,
    type,
    offer,
    options,
    promo,
) => {
    const isCta = !!type?.startsWith('checkout');

    const createHref = () => {
        const params = new URLSearchParams([
            ['osi', offerSelectorId],
            ['type', type],
        ]);
        if (promo) params.set('promo', promo);
        if (offer.commitment === 'PERPETUAL') params.set('perp', true);

        if (isCta) {
            const { workflow, workflowStep } = options;
            params.set('text', options.ctaText ?? DEFAULT_CTA_TEXT);
            if (workflow && workflow !== defaults.checkoutWorkflow) {
                params.set('workflow', workflow);
            }
            if (
                workflowStep &&
                workflowStep !== defaults.checkoutWorkflowStep
            ) {
                params.set('workflowStep', workflowStep);
            }
        } else {
            const {
                displayRecurrence,
                displayPerUnit,
                displayTax,
                displayOldPrice,
                forceTaxExclusive,
            } = options;
            updateParams(params, 'term', displayRecurrence);
            updateParams(params, 'seat', displayPerUnit);
            updateParams(params, 'tax', displayTax);
            updateParams(params, 'old', displayOldPrice);
            updateParams(params, 'exclusive', forceTaxExclusive);
        }
        return `https://milo.adobe.com/tools/ost?${params.toString()}`;
    };

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

        cta.href = createHref();

        const span = document.createElement('span');
        span.textContent = options.ctaText ?? 'buy-now';
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
        return inlinePrice;
    }
};
