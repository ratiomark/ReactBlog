import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoaders(isDev: boolean){
	return {
		test: /\.s[ac]ss$/,
		exclude: /node_modules/,
		use: [
			// Creates `style` nodes from JS strings
			// Мини Css создает отдельные файлы, но нам это не нужно в режиме разработки
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: /\.module\.scss/,
						localIdentName: isDev ? '[local]--[name]-[path]' : '[hash:base64:8]'
					}
				}
			},
			// Compiles Sass to CSS
			'sass-loader',
		]
	}
}