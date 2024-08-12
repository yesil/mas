import { build } from 'esbuild';
import fs from 'node:fs';

const defaults = {
    alias: { react: '../mocks/react.js' },
    bundle: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    external: [],
    format: 'esm',
    metafile: true,
    minify: true,
    platform: 'browser',
    sourcemap: true,
    target: ['es2020'],
};

let { metafile } = await build({
    ...defaults,
    entryPoints: ['src/swc.js'],
    outfile: 'libs/swc.js',
});
fs.writeFileSync('swc.json', JSON.stringify(metafile));

({ metafile } = await build({
    ...defaults,
    entryPoints: ['src/studio.js'],
    outfile: 'libs/studio.js',
}));
fs.writeFileSync('studio.json', JSON.stringify(metafile));
