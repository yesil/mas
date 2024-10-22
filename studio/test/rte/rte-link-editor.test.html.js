import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import '../../src/swc.js';
import '../../src/rte/rte-link-editor.js';

import { createFromTemplate } from '../utils.js';

runTests(async () => {
    describe('RTE link editor', () => {
        it('should render empty form', async () => {
            const rteLink = createFromTemplate('rteLink');
            expect(rteLink.shadowRoot).exist;
        });
    });
});
