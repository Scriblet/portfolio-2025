import js from '@eslint/js'
import globals from 'globals'
import localPlugin from './eslint-rules/no-em-dash.mjs'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['cypress.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['cypress/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
      },
    },
    rules: {
      // As asserções do Chai (`expect(x).to.be.null`) são expressões soltas por
      // desenho; a regra não faz sentido nos specs.
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    // Copy: o travessão (em dash, U+2014) é proibido em qualquer texto.
    // Arquivos fora do ESLint (md, css, html, yml) caem no `npm run lint:text`.
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ignores: [
      'eslint-rules/**',
      'scripts/lib/em-dash.mjs',
      'scripts/check-no-em-dash.mjs',
    ],
    plugins: { local: localPlugin },
    rules: {
      'local/no-em-dash': 'error',
      'local/no-eslint-disable': 'error',
    },
  },
  {
    // Arquivos que precisam citar o caractere para poder proibi-lo.
    files: [
      'eslint-rules/**/*.{js,mjs,cjs}',
      'scripts/lib/em-dash.mjs',
      'scripts/check-no-em-dash.mjs',
    ],
    rules: {
      'local/no-em-dash': 'off',
    },
  },
)
