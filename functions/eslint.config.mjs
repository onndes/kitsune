import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'lib/**/*',
      'generated/**/*',
      'node_modules/**/*',
      'functions/lib/**/*',
    ],
  },
  ...compat.extends(
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTypeScript,
      prettier: eslintPluginPrettier,
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        },
      },
    },

    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react-hooks/exhaustive-deps': 'off',
      quotes: ['error', 'single'],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['firebase-functions', '^firebase-admin/.+'], // ✅ Разрешаем `firebase-functions`
        },
      ],
      indent: ['error', 2],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },
  },
];

export default eslintConfig;
