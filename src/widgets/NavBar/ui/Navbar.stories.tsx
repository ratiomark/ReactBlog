import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { NavBar } from './NavBar'

export default {
	title: 'widgets/Navbar',
	component: NavBar,
	argTypes: {
		backgroundColor: { control: 'color' },
	}
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />

export const LightLogin = Template.bind({})
LightLogin.args = {}
LightLogin.decorators = [StoreDecorator({})]


export const DarkLogin = Template.bind({})
DarkLogin.args = {}
DarkLogin.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({})]

export const LightLogout = Template.bind({})
LightLogout.args = {}
LightLogout.decorators = [StoreDecorator({ user: { authData: { 'id': '1', 'username': 'admin' } } })]


export const DarkLogout = Template.bind({})
DarkLogout.args = {}
DarkLogout.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({ user: { authData: { 'id': '1', 'username': 'admin' } } })]