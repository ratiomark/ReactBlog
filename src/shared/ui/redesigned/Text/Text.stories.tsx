import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Text, TextVariant } from './Text'

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		title: 'This is Title',
		text: 'This is Text'
	}
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const TextPrimary = Template.bind({})

export const OnlyTitle = Template.bind({})
OnlyTitle.args = { text: undefined }

export const OnlyText = Template.bind({})
OnlyText.args = { title: undefined }

export const TextPrimaryDark = Template.bind({})
TextPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]


export const OnlyTitleDark = Template.bind({})
OnlyTitleDark.args = { text: undefined }
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({})
OnlyTextDark.args = { title: undefined }
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]


export const TextError = Template.bind({})
TextError.args = { variant: TextVariant.error }

export const TextErrorDark = Template.bind({})
TextErrorDark.args = { variant: TextVariant.error }
TextErrorDark.decorators = [ThemeDecorator(Theme.DARK)]