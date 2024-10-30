import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import '@adobecom/milo/libs/deps/mas/mas.js';

import '../../src/aem/content-navigation.js';
import '../../src/aem/aem-fragments.js';
import '../../src/aem/table-view.js';
import '../../src/aem/render-view.js';

import '../src/swc.js';
import '../src/studio.js';

import { getTemplateContent } from './utils.js';

runTests(async () => {
    describe('M@S Studio', () => {
        beforeEach(() => {
            //document.location.hash = '#';
            document.querySelector('main').innerHTML = '';
        });

        it('can render existing html', async () => {
            const [studio] = getTemplateContent('studio');
            document.querySelector('main').append(studio);
            expect(studio).exist;
        });
    });
});
