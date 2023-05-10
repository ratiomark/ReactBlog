import { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
export function buildDevServer(option: BuildOptions): DevServerConfiguration {
	return {
		port: option.port,
		open: true,
		// Опция нужна чтобы при перезагрузки страницы не было cannot get
		historyApiFallback: true,
		hot: true,
		client: {
			overlay: true,
			progress: true,
		},
	}
}