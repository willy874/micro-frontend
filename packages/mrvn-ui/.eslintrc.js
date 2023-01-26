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
  ignorePatterns: ['dist/**', 'storybook-static/**', 'node_modules/**'],
  overrides: [
    {
      files: ['**/*.{spec,test}.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['.storybook/**/*.(c|m)?js'],
      env: {
        node: true,
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
};
