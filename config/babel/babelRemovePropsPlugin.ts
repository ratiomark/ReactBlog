import { PluginItem } from '@babel/core'
// это плагин который также работает с AST как и плагины eslint
export function babelRemovePropsPlugin(): PluginItem {
	return {
		visitor: {
			// Использую Program чтобы получить пропсы, которые буду передавать плагину babelRemovePropsPlugin(['data-testid', 'another-attribute'])
			Program(path, state) {
				const forbiddenProps = state.opts.props || []

				// path.traverse - проходит по всем нодам дерева. В траверс указываем тип ноды(function declaration, identifier, import declaration)
				path.traverse({
					JSXIdentifier(current) {
						// получаю имя текущей ноды
						const nodeName = current.node.name
						if (forbiddenProps.includes(nodeName)) {
							// если это нода находится в списке которых нужно выпилить, то выпиливаем
							current.parentPath.remove()
						}
					}
				})
			}
		}
	}
}