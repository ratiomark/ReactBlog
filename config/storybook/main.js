module.exports = {
	'stories': [
		'../../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	'addons': [
		'@storybook/addon-links',
		// вот тут я отключаю бекграунд, чтобы работали темы
		{
			name: '@storybook/addon-essentials',
			options: {
				background: false
			}
		},
		'@storybook/addon-interactions',
		'storybook-addon-mock',
		'storybook-addon-themes'

	],
	'framework': '@storybook/react',
	'core': {
		// builder: '@storybook/builder-webpack5'
		builder: 'webpack5',
	},
	'staticDirs': ['../../public', '../../public/locales']
}