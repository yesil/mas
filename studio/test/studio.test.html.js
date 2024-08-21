// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import '@adobecom/milo/libs/features/mas/mas/src/mas.js';
import '../src/swc.js';
import '../src/studio.js';

import { mockFetch } from '@adobecom/milo/libs/features/mas/mocks/fetch.js';
import { withAem } from '@adobecom/milo/libs/features/mas/mocks/aem.js';
import { withWcs } from '@adobecom/milo/libs/features/mas/mocks/wcs.js';
import { withLiterals } from '@adobecom/milo/libs/features/mas/mocks/literals.js';

import { getTemplateContent, delay } from '@adobe/mas-commons/test/utils.js';

import '@tinymce/tinymce-webcomponent';

runTests(async () => {
    describe('M@S Studio', () => {
        beforeEach(() => {
            // document.location.hash = '#';
            document.querySelector('main').innerHTML = '';
        });

        it('should render', async () => {
            const [studio] = getTemplateContent('studio');
            document.querySelector('main').append(studio);
            expect(studio).exist;
        });

        it.skip('should search via deeplink', async () => {
            // const disposer = await mockFetch(withLiterals, withWcs, withAem);
            const disposer = await mockFetch(withLiterals, withWcs);
            document.location.hash =
                '#path=%2Fcontent%2Fdam%2Fsandbox%2Fmas&query=ccd';
            const [studio] = getTemplateContent('studio');
            document.querySelector('main').append(studio);
            await delay(100);
            const [cc, photoshop] = document.querySelectorAll('merch-card');
            expect(cc).to.exist;
            expect(photoshop).to.exist;
            cc.dispatchEvent(new Event('dblclick'));
            await studio.updateComplate;
            const editor = document.getElementById('editor');
            await delay(100);
            expect(editor.innerText).to.not.empty;
        });
    });
});
