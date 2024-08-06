import { build } from 'esbuild';

build({
    entryPoints: ['src/swc.js'],
    format: 'esm',
    bundle: true,
    outfile: 'libs/swc.js',
    platform: 'browser',
    sourcemap: true,
    define: {
        'process.env.NODE_ENV': '"production"',
    },
}).catch(() => process.exit(1));

build({
    entryPoints: ['src/studio.js'],
    format: 'esm',
    bundle: true,
    outfile: 'libs/studio.js',
    platform: 'browser',
    sourcemap: true,
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    external: ['../libs/ost.js'],
}).catch(() => process.exit(1));
