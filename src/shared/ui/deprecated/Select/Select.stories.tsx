import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Select } from './Select'
export default {
	title: 'shared/Select',
	component: Select,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (arg) => <Select {...arg} />

export const Size50 = Template.bind({})
Size50.args = {
	label: 'Дудка',
	options: [
		{ 'content': 'первая штука', 'value': 'value1' },
		{ 'content': 'вторая штука', 'value': 'value' }
	]
}
