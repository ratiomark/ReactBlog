import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Modal } from './Modal'

export default {
	title: 'shared/Modal',
	component: Modal,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		isOpen: true,
		children: 'Lorem ipsum dolor sit amet consectetu',
	}
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const ModalLight = Template.bind({})
// ModalLight.args = {
// 	children: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit ipsum saepe atque accusantium officia quibusdam maiores quas blanditiis, deserunt aut incidunt nulla optio qui earum.",
// 	isOpen: true,
// }

export const ModalDark = Template.bind({})
// ModalDark.args = {
// 	children: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit ipsum saepe atque accusantium officia quibusdam maiores quas blanditiis, deserunt aut incidunt nulla optio qui earum.",
// 	isOpen: true,
// }
ModalDark.decorators = [ThemeDecorator(Theme.DARK)]
