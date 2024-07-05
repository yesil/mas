// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import '../src/swc.js';
import '../src/studio.js';

import { mockFetch } from './mocks/fetch.js';
import { withAem } from './mocks/aem.js';
import { withWcs } from './mocks/wcs.js';

import mas from './mocks/mas.js';

runTests(async () => {
    await mockFetch(withAem, withWcs);
    await mas();

    describe('M@S Hub', () => {
        it('should render', () => {
            const studio = document.querySelector('mas-studio');
            expect(studio).exist;
        });
    });
});
