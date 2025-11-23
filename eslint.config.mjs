// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // 1. Ignorar carpetas compiladas y node_modules
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // 2. Configuraciones base recomendadas (JS y TS)
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Configuración principal
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Integra las reglas de Prettier para que no haya conflictos
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      // --- REGLAS QoL (Calidad de Vida) ---

      // Permitir nombres de interfaces sin 'I' (ej: User en vez de IUser es estándar en NestJS)
      '@typescript-eslint/interface-name-prefix': 'off',

      // No obligar a especificar el tipo de retorno en cada función (útil para desarrollo rápido)
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Permitir 'any', pero avisar (warn) en lugar de romper el build (error)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Avisar si hay variables declaradas pero no usadas, ignorando las que empiezan con _
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Avisar sobre console.log en lugar de prohibirlos (útil para debug)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
