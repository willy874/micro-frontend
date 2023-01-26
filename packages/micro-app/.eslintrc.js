module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [require.resolve('builder/config/eslint')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['dist/**', 'node_modules/**'],
  overrides: [
    {
      files: ['**/*.{spec,test}.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-anonymous-default-export': 'off',
  },
};
