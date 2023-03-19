import { BuildOptions } from './types/config';
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
	const { paths, isDev, apiUrl, project } = options

	const plugins = [
		// HtmlWebpackPlugin упрощает создание HTML файлов путем подстановки в них собранных webpack’ом сборок. Это очень удобно, особенно для тех сборок, которые включают hash в название выходного файла сборки, который меняется каждую компиляцию.Работает как для js файлов, так и для стилей
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		// new MiniCssExtractPlugin({
		// 	filename: "css/style.[hash:8].css",
		// 	chunkFilename: "css/[id].style.[hash:8].css",
		// }),
		// DefinePlugin позволяет прокидывать в само приложение глобальные переменные. Например, если я передам VERSION: JSON.stringify('1.1.9'), то потом в других частях приложения, например в конфиге i18n, я смогу обратиться к этой переменной
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiUrl),
			__PROJECT__: JSON.stringify(project),
		})
	]

	if (isDev) {
		// HotModuleReplacementPlugin нужен для того, чтобы HotModuleReplacementPlugin отвечает за перезагрузку страницы при изменении кода.
		plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }))
		plugins.push(new webpack.HotModuleReplacementPlugin())
		plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
	}

	return plugins
}