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
    plugins: ['vue'],
    globals: {
        __APP_INFO__: true,
        tinymce: true,
    },
    rules: {
        'vue/multi-word-component-names': 'off',
    },
}
