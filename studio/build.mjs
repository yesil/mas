import { build } from 'esbuild';
import { lessLoader } from 'esbuild-plugin-less';

build({
    entryPoints: ['src/swc.js'],
    format: 'esm',
    bundle: true,
    outfile: 'libs/swc.js',
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
    sourcemap: true,
    define: {
        'process.env.NODE_ENV': '"production"',
    },
}).catch(() => process.exit(1));

build({
    entryPoints: ['src/ost.js'],
    format: 'esm',
    bundle: true,
    outfile: 'libs/ost.js',
    plugins: [lessLoader()],
    sourcemap: true,
    define: {
        'process.env.NODE_ENV': '"production"',
    },
}).catch(() => process.exit(1));
