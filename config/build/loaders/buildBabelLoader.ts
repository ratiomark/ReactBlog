import { babelRemovePropsPlugin } from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface buildBabelLoaderProps extends BuildOptions {
	isTSX?: boolean
}

export function buildBabelLoader({ isDev, isTSX }: buildBabelLoaderProps) {
	return {
		test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'i18next-extract',
						{
							locales: ['ru', 'en'],
							keyAsDefaultValue: ['ru', 'en'],
						}
					],

					[
						// название плагина
						'@babel/plugin-transform-typescript',
						// опции плагина
						{ isTSX }
					],

					'@babel/plugin-transform-runtime',

					isTSX && [
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