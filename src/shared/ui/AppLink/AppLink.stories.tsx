import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { AppLink, AppLinkTheme } from './AppLink'

export default {
	title: 'shared/AppLink',
	component: AppLink,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		to: '/',
		children: 'Text',
	},
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
	theme: AppLinkTheme.primary,
}

export const Secondary = Template.bind({})
Secondary.args = {
	theme: AppLinkTheme.secondary,
}

export const Red = Template.bind({})
Red.args = {
	theme: AppLinkTheme.red,
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
	theme: AppLinkTheme.primary,
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SecondaryDark = Template.bind({})
SecondaryDark.args = {
	theme: AppLinkTheme.secondary,
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const RedDark = Template.bind({})
RedDark.args = {
	theme: AppLinkTheme.red,
}
RedDark.decorators = [ThemeDecorator(Theme.DARK)]
