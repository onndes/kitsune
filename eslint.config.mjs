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
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  {
    rules: {
      // Предупреждение для console.log
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];

export default eslintConfig;
