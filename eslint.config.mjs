import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
    markdown: false,
    prettierOptions: {
      tabWidth: 2,
    },
  },
  languageOptions: {
    globals: {
      __APP_INFO__: true,
      tinymce: true,
      defineModel: 'readonly',
    },
  },
  ignores: [
    '**/node_modules/*',
    'dist',
    '**/*.md',
    'src/styles/mixins/color',
    'public/libs',
    '**/*.svg',
    'docs/.vitepress/cache',
  ],
  typescript: false,
  vue: true,
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    // 'vue/component-definition-name-casing': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/check-param-names': 'off',
  },
})
