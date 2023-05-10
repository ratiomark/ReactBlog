import { JsxAttribute, Node, ObjectLiteralElementLike, Project, SyntaxKind } from 'ts-morph'

const project = new Project({})

const removedFeatureName = process.argv[2] // isCounterEnabled
const featureState = process.argv[3] // on/off

if (!removedFeatureName) throw new Error('Укажи название фичи')
if (!featureState) throw new Error('Укажи состояние фичи(on или off)')
if (featureState !== 'on' && featureState !== 'off') throw new Error('Cостояние фичи может быть либо on, либо off')

const toggleFeatureName = 'toggleFeatures'
const toggleFeatureComponentName = 'ToggleFeatures'


// все файлы с которыми будем работать, морф рекурсивно пройдет по всем этим файлам
// project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx')
// project.addSourceFilesAtPaths('src/**/*.tsx')

// полуачаем все файлы с расширение ts и tsx
const files = project.getSourceFiles()


const getAttributeByName = (jsxAttributes: JsxAttribute[], name: string): JsxAttribute | undefined => {
	return jsxAttributes.find(attribute => attribute.getName() === name)
}

const getValueOfAttribute = (jsxAttribute: JsxAttribute | undefined) => {
	let value = jsxAttribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText()
	// избаляюсь от скобок, если они имеются
	if (value?.startsWith('(')) {
		value = value.slice(1, -1)
	}
	return value
}

const getFeatureNameFromAttribute = (jsxAttribute: JsxAttribute | ObjectLiteralElementLike | undefined) => {
	return jsxAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1)
}

// Будет работать только со стрелочными в одну строку 
// on: () => <Something/> 
// on: () => 'value'
// on: () => someFunction()
const getReturnBodyOfArrowFunctionFromObjectLiteral = (funcFromObjectLiteral: ObjectLiteralElementLike | undefined) => {
	const arrowFuncNode = funcFromObjectLiteral?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
	const returnBodyOfArrowFunc = arrowFuncNode?.getBody().getText() ?? ''
	return returnBodyOfArrowFunc
}

const replaceToggleFunction = (node: Node) => {
	// получаю объект, который лежит в функции {name: 'someName', on: ()=><Something/>, off: ()=><SomethingOther/>}
	const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression)

	const featureNameFunction = objectOptions?.getProperty('name')
	const offFunctionProperty = objectOptions?.getProperty('off')
	const onFunctionProperty = objectOptions?.getProperty('on')

	const featureName = getFeatureNameFromAttribute(featureNameFunction)

	if (featureName !== removedFeatureName) return

	const onFunctionReturnValue = getReturnBodyOfArrowFunctionFromObjectLiteral(onFunctionProperty)
	const offFunctionReturnValue = getReturnBodyOfArrowFunctionFromObjectLiteral(offFunctionProperty)

	if (featureState === 'on') {
		node.replaceWithText(onFunctionReturnValue)
	}
	if (featureState === 'off') {
		node.replaceWithText(offFunctionReturnValue)
	}
}

const replaceToggleComponent = (node: Node) => {
	const jsxAttributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

	const featureNameAttribute = getAttributeByName(jsxAttributes, 'name')
	const featureNameValue = getFeatureNameFromAttribute(featureNameAttribute)

	if (featureNameValue !== removedFeatureName) return

	const onAttribute = getAttributeByName(jsxAttributes, 'on')
	const onValue = getValueOfAttribute(onAttribute)

	const offAttribute = getAttributeByName(jsxAttributes, 'off')
	const offValue = getValueOfAttribute(offAttribute)

	if (featureState === 'on' && onValue) {
		node.replaceWithText(onValue)
		return
	}

	if (featureState === 'off' && offValue) {
		node.replaceWithText(offValue)
	}
}

files.forEach(sourceFile => {
	// итерируюсь по всем потомкам
	sourceFile.forEachDescendant(node => {
		// если нода является типом callExpression
		if (node.isKind(SyntaxKind.CallExpression)) {
			// итерируюсь по всем потомкам ноды, ищу именно функцию toggleFeatures
			node.forEachChild(child => {
				// текущий ребенок является идентификатором и текст внутри === toggleFeatures
				if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFeatureName) {
					// null
					replaceToggleFunction(node)
				}
			})
		} else if (node.isKind(SyntaxKind.JsxSelfClosingElement) && node.getTagNameNode().getText() === toggleFeatureComponentName) {
			replaceToggleComponent(node)
		}
	})
})

// применить изменения
project.save()