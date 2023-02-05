module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [require.resolve('@micro-app/configuration/eslint.react')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['**/*.{spec,test}.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/*.js'],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    '@typescript-eslint/no-unused-vars':
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
