import { BuildOptions } from './types/config';
import webpack from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
const imageInlineSizeLimit = parseInt(
	process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);
export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const { isDev } = options
	const cssLoader = {
		test: /\.s[ac]ss$/,
		use: [
			// Creates `style` nodes from JS strings
			// Мини Css создает отдельные файлы, но нам это не нужно в режиме разработки
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: /\.module\.scss/,
						localIdentName: isDev ? '[local]--[name]-[path]' : '[hash:base64:8]'

					}

				}
			},
			// Compiles Sass to CSS
			"sass-loader",
		]
	}

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}
	const fontLoader = {
		test: /\.(woff(2)?|ttf|woff|eot)(\?v=\d+\.\d+\.\d+)?$/,
		type: 'asset/resource',
	}

	const svgLoader: webpack.RuleSetRule = {
		test: /\.svg$/i,
		type: 'asset',
		resourceQuery: /url/, // *.svg?url
	}

	const svgLoaderAsComponent: webpack.RuleSetRule = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
		use: ['@svgr/webpack'],
	}

	const imgLoader: webpack.RuleSetRule = {
		test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
		type: 'asset',
		parser: {
			dataUrlCondition: {
				maxSize: imageInlineSizeLimit,
			},
		},
	}
	// const imgLoader: webpack.RuleSetRule = {
	//   test: /\.(png|svg|jpg|jpeg|gif)$/,
	//   type: 'asset/resource',
	//   generator: {
	//     filename: 'images/[name].[hash][ext]',
	//   }
	// }

	return [
		fontLoader,
		svgLoader,
		svgLoaderAsComponent,
		imgLoader,
		typescriptLoader,
		cssLoader,
	]
}