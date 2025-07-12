import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		extends: ['js/recommended'],
		plugins: { js },
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
	},
	{
		rules: {
			'perfectionist/sort-variable-declarations': ['error'],
			'perfectionist/sort-array-includes': ['error'],
			'perfectionist/sort-object-types': ['error'],
			'perfectionist/sort-switch-case': ['error'],
			'perfectionist/sort-union-types': ['error'],
			'perfectionist/sort-interfaces': ['error'],
			// 'perfectionist/sort-jsx-props': ['error'],
			// 'perfectionist/sort-objects': ['error'],
			'perfectionist/sort-enums': ['error'],
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': 'error',
		},
		settings: {
			perfectionist: {
				fallbackSort: { type: 'alphabetical', order: 'asc' },
				type: 'line-length',
				order: 'desc',
			},
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
			perfectionist,
		},
	},
	tseslint.configs.recommended,
]);
