import { addDecorator } from '@storybook/react'
import { Theme } from '../../src/app/providers/ThemeProvider'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'
import { I18nDecorator } from '../../src/shared/config/storybook/i18nDecorator'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
addDecorator(StyleDecorator)
addDecorator(I18nDecorator)
addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(RouterDecorator)
