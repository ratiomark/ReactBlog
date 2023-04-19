import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Avatar } from './Avatar'
import Image from './78_big.jpg'
export default {
	title: 'shared/Avatar',
	component: Avatar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (arg) => <Avatar {...arg} />

export const Size50 = Template.bind({})
Size50.args = {
	size: 50,
	src: Image
}

export const Size100 = Template.bind({})
Size100.args = {
	size: 100,
	src: Image
}

export const Size150 = Template.bind({})
Size150.args = {
	size: 150,
	src: Image
}

export const Size200 = Template.bind({})
Size200.args = {
	size: 200,
	src: Image
}
