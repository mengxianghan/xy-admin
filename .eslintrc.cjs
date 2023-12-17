module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommended',
        'eslint-config-prettier',
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue', 'prettier', 'import'],
    globals: {
        __APP_INFO__: true,
        tinymce: true,
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.json', '.vue'],
            },
        },
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': 'error',
        'import/no-unresolved': ['error', { caseSensitive: true }],
    },
}
