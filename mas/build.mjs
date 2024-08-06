import { build } from 'esbuild';
import fs from 'node:fs';

const defaults = {
    bundle: true,
    format: 'esm',
    metafile: true,
    minify: true,
    platform: 'browser',
    sourcemap: true,
    target: ['es2020'],
};

let { metafile } = await build({
    ...defaults,
    alias: {
        react: '../mocks/react.js',
    },
    entryPoints: ['./src/mas.js'],
    outfile: '../libs/mas.js',
});
fs.writeFileSync('mas.json', JSON.stringify(metafile));

({ metafile } = await build({
    ...defaults,
    entryPoints: ['./src/merch-card-all.js'],
    outfile: '../libs/merch-card-all.js',
}));
fs.writeFileSync('merch-card-all.json', JSON.stringify(metafile));
