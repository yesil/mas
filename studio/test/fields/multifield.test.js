import { expect } from '@esm-bundle/chai';
import { html } from 'lit';
import { fixture, oneEvent } from '@open-wc/testing-helpers/pure';

import '../../src/swc.js';
import '../../src/fields/multifield.js';
import '../../src/fields/mnemonic-field.js';

import { spTheme } from '../utils.js';

describe('Multifield', () => {
    it.skip('should support sp-textffield', async () => {});

    it('should support mas-mnemonic-field', async () => {
        const values = [
            {
                icon: 'https://www.adobe.com/cc-shared/assets/img/product-icons/svg/creative-cloud.svg',
                alt: 'This is an alt text',
                link: 'https://www.adobe.com/creativecloud/all-apps.html',
            },
            {
                icon: 'https://www.adobe.com/cc-shared/assets/img/product-icons/svg/creative-cloud.svg',
                alt: 'This is an alt text',
                link: 'https://www.adobe.com/creativecloud/all-apps.html',
            },
        ];
        const el = await fixture(
            html`
                <mas-multifield .values="${values}">
                    <template>
                        <mas-mnemonic-field></mas-mnemonic-field>
                    </template>
                </mas-multifield>
            `,
            { parentNode: spTheme() },
        );
        const listener = oneEvent(el, 'change');
    });
});
