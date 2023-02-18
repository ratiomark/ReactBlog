import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, ThemeButton } from './Button'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
	children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
	children: 'Text',
	theme: ThemeButton.clear,
}

export const Outline = Template.bind({})
Outline.args = {
	children: 'Text',
	theme: ThemeButton.outline,
}
export const OutlineDark = Template.bind({})
OutlineDark.args = {
	children: 'Text',
	theme: ThemeButton.outline,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]
