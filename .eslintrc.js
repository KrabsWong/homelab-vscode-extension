module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/semi': 'warn',
    curly: 'warn',
    quotes: [2, 'single'],
    eqeqeq: 'warn',
    'no-throw-literal': 'warn',
    semi: 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'arrow-body-style': ['error', 'as-needed'],
    'import/order': ['error', {
      pathGroups: [
        {
          group: 'external',
          pattern: '@/**',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: {
        order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
        caseInsensitive: true, /* ignore case. Options: [true, false] */
      },
      'newlines-between': 'always',
    }],
  },
  ignorePatterns: [
    'out',
    'dist',
    '**/*.d.ts',
  ],
};
