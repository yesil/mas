import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import '../../src/swc.js';
import '../../src/rte/rte-editor.js';
import '../../src/rte/rte-link-editor.js';
import '@adobecom/milo/libs/deps/mas/mas.js';
import { mockFetch } from '@adobecom/milo/libs/features/mas/mocks/fetch.js';
import { withWcs } from '@adobecom/milo/libs/features/mas/mocks/wcs.js';

import { createFromTemplate } from '../utils.js';

runTests(async () => {
    await mockFetch(withWcs);
    describe('RTE Editor', () => {
        it('should render with default attributes', async () => {
            const rte = createFromTemplate('rte');
            expect(rte.shadowRoot).exist;
        });

        it('should support inline-price', async () => {
            const rte = createFromTemplate('rte-text-price-only');
            expect(rte.shadowRoot).exist;
        });

        it('should support checkout-link', async () => {
            const rte = createFromTemplate('rte-link-checkout-only');
            expect(rte.shadowRoot).exist;
        });

        it('should support OST', async () => {
            const rte = createFromTemplate('rte-all');
            expect(rte.shadowRoot).exist;
        });
    });
});
