// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';
import { mockConfig } from './mocks/config.js';

import '../src/merch-icon.js';
import '../src/merch-card.js';
import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-quantity-select.js';

import { appendMiloStyles } from './utils.js';
import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import { withLiterals } from './mocks/literals.js';
import mas from './mocks/mas.js';

const skipTests = sessionStorage.getItem('skipTests');

runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch(withWcs, withLiterals);
    await mas();
    if (skipTests !== null) {
        appendMiloStyles();
        return;
    }
    describe('merch-card web component with inline-heading(BACOM) variant', () => {});
});
