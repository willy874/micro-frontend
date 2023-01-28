module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [require.resolve('configuration/eslint.base')],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  ignorePatterns: ['dist/**', 'node_modules/**'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
};
