import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Loader } from './Loader'

export default {
	title: 'shared/Loader',
	component: Loader,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />

export const LoaderLight = Template.bind({})

export const LoaderDark = Template.bind({})
LoaderDark.decorators = [ThemeDecorator(Theme.DARK)]
