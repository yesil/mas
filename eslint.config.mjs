import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const config = {
    rules: {
        'prefer-const': 'error',
        'no-var': 'error',
        'prefer-template': 'warn',
        'prefer-rest-params': 'warn',
        'prefer-spread': 'warn',
    },
    ignores: [
        '/node_modules/',
        '**/node_modules/**',
        '/lib/',
        '**/lib/**',
        '**/dist/**',
        'mas.js',
    ],
    ...eslintPluginPrettierRecommended,
};

export default [config];
