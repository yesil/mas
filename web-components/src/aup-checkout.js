import { applyPageLocaleToCheckoutUrl } from './buildCheckoutUrl.js';

function getRequest(offers, options) {
    if (
        offers.length !== 1 ||
        !options.country ||
        options.quantity?.some((quantity) => quantity !== 1) ||
        (options.q != null && Number(options.q) !== 1) ||
        options.promotionCode ||
        options.apc ||
        options.ao ||
        options.addonProductArrangementCode ||
        options.upgrade ||
        options.perpetual ||
        options.checkoutWorkflowStep?.startsWith('change-plan/')
    ) {
        return;
    }
    const [offer] = offers;
    if (
        !offer.productArrangementCode ||
        !['BASE', 'TRIAL'].includes(offer.offerType) ||
        offer.promotion
    ) {
        return;
    }
    const context = {
        clientId: options.checkoutClientId,
        clientType: 'web',
        co: options.country,
        pa: offer.productArrangementCode,
        cs: options.cs,
        ms: options.ms,
    };
    const preselectPlan = options.preselectPlan?.toLowerCase();
    if (preselectPlan === 'edu') context.ms = 'EDU';
    if (preselectPlan === 'team') context.cs = 'TEAM';
    const pc = offer.productArrangement?.productCode;
    if (pc) context.pc = pc;
    for (const key of ['svar', 'customerIntent', 'sid']) {
        if (options[key]) context[key] = options[key];
    }
    const localeUrl = new URL('https://commerce.adobe.com');
    localeUrl.searchParams.set('lang', options.language);
    const params = {
        lang: new URL(applyPageLocaleToCheckoutUrl(localeUrl)).searchParams.get(
            'lang',
        ),
        ctxrturl: options.ctxrturl ?? window.location.href,
        ot: offer.offerType,
    };
    for (const key of ['rtc', 'lo', 'af']) {
        if (options[key]) params[key] = options[key];
    }
    return {
        intent: offer.offerType === 'TRIAL' ? 'try' : 'buy',
        context,
        params,
    };
}

export async function launchAupCheckout(sdk, offers, options, onClose) {
    const request = getRequest(offers, options);
    if (!request) return false;
    const orchestrator = await sdk.getOrchestratorContext();
    if (typeof orchestrator?.launchWorkflowInModal !== 'function') return false;
    let items;
    let messageHandler;
    if (onClose) {
        // A per-launch handler replaces the host handler in the SDK.
        const hostHandler = orchestrator.clientMessageHandler;
        messageHandler = (name, payload, parentHandler) => {
            const actions = payload?.data?.actions;
            if (
                name === 'System' &&
                payload?.subType === 'AppClosed' &&
                Array.isArray(actions)
            ) {
                items = actions.find(
                    (action) =>
                        action?.required &&
                        action.actionMessage?.type === 'System' &&
                        action.actionMessage?.subType === 'ReportState',
                )?.actionMessage.data?.commerce?.cart;
            }
            if (typeof hostHandler === 'function') {
                return hostHandler(name, payload, parentHandler);
            }
            return parentHandler(name, payload);
        };
    }
    const result = await (messageHandler
        ? orchestrator.launchWorkflowInModal(request, messageHandler)
        : orchestrator.launchWorkflowInModal(request));
    if (result?.status === 'cancel') {
        if (
            Array.isArray(items) &&
            items.every(
                (item) => typeof item?.productArrangementCode === 'string',
            ) &&
            items.some(
                (item) => item?.productArrangementCode === request.context.pa,
            )
        ) {
            onClose?.(items);
        }
    }
    return result?.status !== 'no-workflow-found';
}
