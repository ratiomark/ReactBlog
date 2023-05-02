import { addDecorator } from '@storybook/react'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator'
import { Theme } from '@/shared/types/Theme'
// import { I18nDecorator } from '../../src/shared/config/storybook/i18nDecorator'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'fullscreen',
	// чтобы темы работали в main нужно отключить один из аддонов отвечающий на бекграунт
	themes: {
		default: 'light',
		list: [
			{ name: 'light', class: ['app', 'app_light_theme'], color: '#00aced' },
			{ name: 'dark', class: ['app', 'app_dark_theme'], color: '#3b5998' }
		],
	},

}

addDecorator(StyleDecorator)
// addDecorator(I18nDecorator)
// addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(RouterDecorator)
addDecorator(SuspenseDecorator)
