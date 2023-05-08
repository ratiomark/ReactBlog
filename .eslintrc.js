module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true,
	},
	settings: {
		'react': {
			'version': 'detect'
		}
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:i18next/recommended',
		// "plugin:react-hooks/recommended"
		// 'custom-fsd-checker-plugin'
		// 'prettier/@typescript-eslint',
		// 'prettier',
		// "plugin:prettier/recommended",
		// 'prettier',
	],
	ignorePatterns: ['.fttemplates/**/*'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'react-hooks',
		'i18next',
		'custom-fsd-checker-plugin',
	],
	rules: {
		// добавляю alias в настройки плагина, чтобы он работал корректно с моим элиасом
		// 'custom-fsd-checker-plugin/path-checker': 'error',
		'custom-fsd-checker-plugin/path-checker': ['error', { alias: '@' }],
		'custom-fsd-checker-plugin/public-api-imports': ['error', {
			alias: '@',
			testFiles: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
		}],
		'custom-fsd-checker-plugin/layer-import-sequence': ['error', {
			alias: '@',
			ignoreImportPatterns: ['**/StoreProvider', '**/routeConfig', '**/Page'],
			ignoreFilesPatterns: ['**/storybook/StoreDecorator.tsx']
		}],
		// npm i -D eslint-plugin-custom-fsd-checker-plugin@latest
		// "prettier/prettier": [2], // Means error
		// 'code': [1, 80],
		'react/jsx-indent': [1, 'tab'],
		'react/jsx-indent-props': [1, 'tab'],
		indent: [1, 'tab', { 'SwitchCase': 1 }],
		'no-mixed-spaces-and-tabs': [1, 'smart-tabs'],
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.tsx'] },
		],
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/no-empty-function': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'off',
		// 'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'multiline' }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/display-name': 'off',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		'no-undef': 'off',
		// 'eslint quotes': ["warn", "single"],
		'quotes': [2, 'single', { 'avoidEscape': true }],
		'@typescript-eslint/quotes': [
			2,
			'single',
			{
				'avoidEscape': true,
				'allowTemplateLiterals': true
			}
		],
		'i18next/no-literal-string': [
			1,
			{
				markupOnly: true,
				onlyAttribute: [''],
				ignoreAttribute: ['data-testid'],
			},
		],
		'max-len': [
			0,
			{
				ignoreComments: true,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
			},
		],
	},
	globals: {
		__IS_DEV__: true,
		__API__: true,
		__PROJECT__: true,
	},
	overrides: [
		{
			files: ['**/src/**/*.test.{ts,tsx}'],
			rules: { 'i18next/no-literal-string': 'off' },
		},
	],
}
