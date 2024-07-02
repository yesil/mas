// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';
import { mockConfig } from './mocks/config.js';

import '../src/merch-icon.js';
import '../src/merch-card.js';
import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-quantity-select.js';

import { appendMiloStyles, delay } from './utils.js';
import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mocks/mas.js';

const skipTests = sessionStorage.getItem('skipTests');

runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch(withWcs);
    await mas();
    if (skipTests !== null) {
        appendMiloStyles();
        return;
    }
    describe('merch-card web component', () => {
        it('should exist in the HTML document', async () => {
            expect(document.querySelector('merch-card')).to.exist;
        });
        it('should exist special offers card in HTML document', async () => {
            expect(
                document.querySelector('merch-card[variant="special-offers"]'),
            ).to.exist;
        });
        it('should display a merch-badge', async () => {
            expect(
                document
                    .querySelector('merch-card[variant="special-offers"]')
                    .shadowRoot.querySelector('.special-offers-badge'),
            ).to.exist;
        });
        it('should exist segment card in HTML document', async () => {
            expect(document.querySelector('merch-card[variant="segment"]')).to
                .exist;
        });
        it('should exist a plans card in HTML document', async () => {
            expect(document.querySelector('merch-card[variant="plans"]')).to
                .exist;
        });
        it('should exist an image card in HTML document', async () => {
            expect(document.querySelector('merch-card[variant="image"]')).to
                .exist;
        });
        it('should exist an inline heading card in HTML document', async () => {
            expect(
                document.querySelector('merch-card[variant="inline-heading"]'),
            ).to.exist;
        });
        it('should exist an inline heading card in HTML document with CTA button', async () => {
            expect(
                document.querySelector(
                    'merch-card[variant="inline-heading"] div[slot="footer"] a.con-button.blue',
                ),
            ).to.exist;
        });
        it('should have stock trial checkbox', async () => {
            const plansCard = document.querySelector(
                'merch-card[variant="plans"]',
            );
            const stockCheckbox =
                plansCard.shadowRoot.getElementById('stock-checkbox');
            expect(stockCheckbox).to.exist;
            expect(plansCard.price.dataset.wcsOsi).to.equal('m2m');
            expect(plansCard.checkoutLinks[0].dataset.wcsOsi).to.equal('m2m');
            stockCheckbox.querySelector('input').click();
            await delay(100);
            expect(plansCard.checkoutLinks[0].dataset.wcsOsi).to.equal(
                'm2m,stock-m2m',
            );
        });
        it('should display an action menu on hover for catalog variant', async () => {
            const catalogCard = document.querySelector(
                'merch-card[variant="catalog"]',
            );
            catalogCard.dispatchEvent(
                new MouseEvent('mouseover', { bubbles: true }),
            );
            await delay(100);
            const shadowRoot = catalogCard.shadowRoot;
            const actionMenu = shadowRoot.querySelector('.action-menu');
            const actionMenuContent = shadowRoot.querySelector(
                '.action-menu-content',
            );
            expect(actionMenu.classList.contains('invisible')).to.be.true;
            expect(actionMenuContent.classList.contains('hidden')).to.be.true;
            expect(actionMenu).to.exist;
            expect(actionMenuContent).to.exist;
        });

        it('should have and interact with  quantity-selector', async () => {
            const plansCard = document.querySelector('merch-card[type="q-ty"]');
            const quantitySelect = plansCard.querySelector(
                'merch-quantity-select',
            );
            expect(quantitySelect).to.exist;
            const inputField =
                quantitySelect.shadowRoot.querySelector('.text-field-input');
            inputField.value = '3';
            const event = new KeyboardEvent('keyup', {
                key: '3',
                bubbles: true,
            });
            event.composedPath = () => [quantitySelect];
            inputField.dispatchEvent(event);
            await delay(100);
            expect(quantitySelect.selectedValue).to.equal(3);
            const button = plansCard.querySelector('.con-button');
            expect(button.getAttribute('data-quantity')).to.equal('3');
        });
    });

    it('should return title for special offer card', async () => {
        const title = document.querySelector(
            'merch-card[variant="special-offers"]',
        ).title;
        expect(title).to.equal('INDIVIDUALS');
    });

    it('should return title for segment card', async () => {
        const title = document.querySelector(
            'merch-card[variant="segment"]',
        ).title;
        expect(title).to.equal('Individuals');
    });
});
