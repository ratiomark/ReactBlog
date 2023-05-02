import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
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

export const Inverted = Template.bind({})
Inverted.args = {
	theme: AppLinkTheme.inverted,
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

export const InvertedDark = Template.bind({})
InvertedDark.args = {
	theme: AppLinkTheme.inverted,
}
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)]

export const RedDark = Template.bind({})
RedDark.args = {
	theme: AppLinkTheme.red,
}
RedDark.decorators = [ThemeDecorator(Theme.DARK)]
