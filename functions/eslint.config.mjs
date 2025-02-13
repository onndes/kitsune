import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    ignores: ['lib/**/*', 'generated/**/*'], // Игнорируемые файлы
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react-hooks/exhaustive-deps': 'off',
      quotes: ['error', 'single'],
      'import/no-unresolved': 0,
      indent: ['error', 2],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },
  },
];

export default eslintConfig;
