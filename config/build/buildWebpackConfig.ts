import path from 'path';
import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): Configuration {
	const { mode, paths, isDev } = options;

	return {
		mode: mode,
		// Вот тут есть есть дефолтное значение main. Можно добавить свои энтри поинты entry:{rnd: path}. А когда один аргумент как сейчас, то это автоматом entry: {main: path}
		entry: paths.entry,
		output: {
			filename: '[name].[contenthash].js',
			path: paths.build,
			clean: true,
			publicPath: '/',
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		// использую сурсмапу eval-cheap-module-source-map, потому что она быстро ребилдиться, в отличии от inline-source-map
		devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
		// devtool: isDev ? 'inline-source-map' : undefined,
		devServer: isDev ? buildDevServer(options) : undefined,

		stats: {
			// https://docs.w3cub.com/webpack/configuration/stats#stats
			errorDetails: true,
			children: true
		},
	}
}