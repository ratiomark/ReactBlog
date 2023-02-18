import { TemplateCreator } from './createTemplate'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator' 

export const appThemeCreator: TemplateCreator<Theme, any> = (theme) => (template) => {
	if (!template.decorators) template.decorators = []
	template.decorators.push(ThemeDecorator(theme))

	return template
}
