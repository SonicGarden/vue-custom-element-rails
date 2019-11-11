module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base'],
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',

    // SEE: https://github.com/vuejs/eslint-config-typescript/blob/master/index.js
    'no-undef': 'off',
    'no-unused-vars': 'off',
    strict: 'off',
  },
}
