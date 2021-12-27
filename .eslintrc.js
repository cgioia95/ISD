module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'unused-imports'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb/base',
    'plugin:import/typescript',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,

        project: '.',
      },
    },
  },
  env: {
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_',
      },
    ],
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['src/entities/**.ts'],
      rules: {
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['src/seeds/**/**/**.ts'],
      rules: {
        'class-methods-use-this': 'off',
      },
    },
  ],
}
