module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    "import/no-named-as-default": 0,
    semi: [2, 'always'],
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'prettier/prettier': ['error', { semi: true }],
    'vue/html-self-closing': 'off',
    'arrow-parens': 'off',
  },
};
