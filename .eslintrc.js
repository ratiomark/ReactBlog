module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:i18next/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'i18next'
	],
	rules: {
		// 'code': [1, 80],
		'react/jsx-indent': [1, "tab"],
		'react/jsx-indent-props': [1, "tab"],
		indent: [1, "tab"],
		"no-mixed-spaces-and-tabs": [1, 'smart-tabs'],
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-unused-vars': 'off',
		"@typescript-eslint/no-unused-vars": "off",
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		"no-undef": 'warn',
		'i18next/no-literal-string': [1, { "markupOnly": true, onlyAttribute: [""] }],
		'max-len': [0, {
			"ignoreComments": true,
			"ignoreTrailingComments": true,
			"ignoreUrls": true,
			"ignoreStrings": true
		}
		]
	},
	globals: {
		__IS_DEV__: true,
	},
};
