import { BuildOptions } from './types/config';
import { ResolveOptions } from 'webpack'

export function buildResolvers(options: BuildOptions): ResolveOptions {
	return {
		// тут указываются типы расширений файлов, для которых при импорте я не буду указывать расширение. То есть не index.js, а просто index
		extensions: ['.tsx', '.ts', '.js'],
		preferAbsolute: true,
		modules: [options.paths.src, 'node_modules'],
		mainFiles: ['index'],
		alias: {}
	}
}