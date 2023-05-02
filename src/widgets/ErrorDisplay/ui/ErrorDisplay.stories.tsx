import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { ErrorDisplay } from './ErrorDisplay'

export default {
	title: 'widgets/ErrorDisplay',
	component: ErrorDisplay,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ErrorDisplay>

const Template: ComponentStory<typeof ErrorDisplay> = (args) => <ErrorDisplay {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
