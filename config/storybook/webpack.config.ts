import { BuildPaths } from '../build/types/config'
import { buildCssLoaders } from '../build/loaders/buildCssLoaders'
import { Configuration, RuleSetRule } from 'webpack'
import webpack from 'webpack'
import path from 'path'

export default ({ config }: { config: Configuration }) => {
	const paths: BuildPaths = {
		build: '',
		html: '',
		entry: '',
		src: path.resolve(__dirname, '..', '..', 'src'),
		locales: '',
		buildLocales: ''
	}

	config!.resolve!.modules!.push(paths.src)

	config!.resolve!.alias = {
		...config!.resolve!.alias,
		'@': paths.src
	}

	config!.resolve!.extensions!.push('.ts', '.tsx')

	const rules = config.module!.rules as RuleSetRule[]
	config!.module!.rules = rules.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/i };
		}

		return rule;
	});

	config!.module!.rules.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});
	config!.module!.rules.push(buildCssLoaders(true))

	config!.plugins!.push(new webpack.DefinePlugin({
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify('https://testapi.ru'),
		__PROJECT__: JSON.stringify('storybook'),
	}))

	return config
}