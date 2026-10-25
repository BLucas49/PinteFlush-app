const { defineConfig } = require('eslint/config');
const expo = require('eslint-config-expo/flat');
const prettier = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

const DEPTH_PATTERN = {
  group: ['../../../*'],
  message: "Utilisez l'alias @/... plutôt qu'un chemin relatif de profondeur ≥ 3.",
};

const forbid = (layer, from) => ({
  group: [`@/${layer}/*`, `@/${layer}/**`, `**/${layer}/**`],
  message: `${from}/ ne doit pas importer ${layer}/ — voir le modèle en couches dans AGENTS.md.`,
});

module.exports = defineConfig([
  expo,
  prettier,

  // Ignorer les dossiers de build, natifs et dépendances
  {
    ignores: ['dist/*', '.expo/*', 'android/*', 'ios/*', 'coverage/*', 'node_modules/*'],
  },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      // ==================== IMPORTS ====================
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // ==================== REACT ====================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/self-closing-comp': 'warn',
      'react-native/no-inline-styles': 'off',

      // ==================== GENERAL ====================
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      'no-unused-expressions': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['warn', 'all'],
      'no-nested-ternary': 'warn',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // ==================== TYPESCRIPT ====================
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
    },
  },

  // NOTE: flat config prend les options du DERNIER bloc correspondant pour une règle — les
  // blocs ne sont pas fusionnés. Les trois blocs ci-dessous ciblent donc des fichiers
  // disjoints pour que no-restricted-imports ne soit configurée qu'une fois par fichier.

  // shared/ est la couche la plus basse : ne dépend ni de features/ ni de navigation/
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [forbid('features', 'shared'), forbid('navigation', 'shared'), DEPTH_PATTERN],
        },
      ],
    },
  },

  // features/ peut dépendre de shared/ et d'autres features/, mais pas de navigation/
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [forbid('navigation', 'features'), DEPTH_PATTERN] }],
    },
  },

  // Ailleurs (navigation/, main.tsx, config, tests…) : seule la règle de profondeur s'applique
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['src/shared/**/*.{ts,tsx}', 'src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [DEPTH_PATTERN] }],
    },
  },

  // Tests
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'off',
    },
  },
]);
