import { Project } from 'ts-morph'

const project = new Project({})

// все файлы с которыми будем работать, морф рекурсивно пройдет по всем этим файлам
project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

// полуачаем все файлы с расширение ts и tsx
const files = project.getSourceFiles()

function isRelevantValue(value: string) {
	const layers = ['app', 'entities', 'features', 'widgets', 'pages', 'shared']
	// тру если это один из моих слоев
	return layers.some(layer => value.startsWith(layer))
}

files.forEach(sourceFile => {
	// тут я могу работать с нодами AST
	const importDeclarations = sourceFile.getImportDeclarations()
	importDeclarations.forEach(importDeclaration => {
		const value = importDeclaration.getModuleSpecifierValue()
		// вот такие value тут будут
		// entities/User
		// shared/lib/tests/TestAsyncThunk
		// @reduxjs/toolkit
		// app/providers/StoreProvider
		if (isRelevantValue(value)) {
			// у этой ноды я устанавливаю specifier
			importDeclaration.setModuleSpecifier('@/' + value)
		}

	})
})

// применить изменения
project.save()