import { babelRemovePropsPlugin } from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface buildBabelLoaderProps extends BuildOptions {
	isTSX?: boolean
}

export function buildBabelLoader({ isDev, isTSX }: buildBabelLoaderProps) {
	const isProd = !isDev
	return {
		test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				// по идее добавляет в node_modules/.cache папку babel, в которой будет хранится кешированные данные, это должно ускорить пересборку проекта, потому что уже не нужно будет каджый раз собирать все с нуля, babel будет тянуть из кеша
				// важный момент, чтобы все работало корректно, каждый раз когда я устанвливаю новые зависимости, я должен удалять папку с кешем. Для этого подойдет такая штука как postinstall, нужно указать в package.json "postinstall": ""
				cacheDirectory: true,
				presets: ['@babel/preset-env'],
				plugins: [
					// [
					// 	'i18next-extract',
					// 	{
					// 		locales: ['ru', 'en'],
					// 		keyAsDefaultValue: ['ru', 'en'],
					// 	}
					// ],

					[
						// название плагина
						'@babel/plugin-transform-typescript',
						// опции плагина
						{ isTSX }
					],

					'@babel/plugin-transform-runtime',

					// удаляю только если это прод
					isTSX && isDev && [
						// самописный плагин
						babelRemovePropsPlugin,
						// опции для плагина
						{
							props: ['data-testid']
						}
					],

					isDev && require.resolve('react-refresh/babel'),

				].filter(Boolean)
			}
		}
	}
}