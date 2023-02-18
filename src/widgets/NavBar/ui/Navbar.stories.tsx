import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { NavBar } from './NavBar'

export default {
	title: 'widgets/Navbar',
	component: NavBar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
