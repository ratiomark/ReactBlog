import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Text, TextVariant } from './Text'

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		title: "This is Title",
		text: "This is Text"
	}
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const TextPrimary = Template.bind({})

export const OnlyTitle = Template.bind({})
OnlyTitle.args = { text: null }

export const OnlyText = Template.bind({})
OnlyText.args = { title: null }

export const TextPrimaryDark = Template.bind({})
TextPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]


export const OnlyTitleDark = Template.bind({})
OnlyTitleDark.args = { text: null }
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({})
OnlyTextDark.args = { title: null }
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]


export const TextError = Template.bind({})
TextError.args = { variant: TextVariant.error }

export const TextErrorDark = Template.bind({})
TextErrorDark.args = { variant: TextVariant.error }
TextErrorDark.decorators = [ThemeDecorator(Theme.DARK)]