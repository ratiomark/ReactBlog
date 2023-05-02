import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { CurrencySelect } from './CurrencySelect'


export default {
	title: 'entities/CurrencySelect',
	component: CurrencySelect,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CurrencySelect>

const Template: ComponentStory<typeof CurrencySelect> = (arg) => <CurrencySelect {...arg} />

export const Primary = Template.bind({})
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
export const Dark = Template.bind({})
Dark.decorators = [ThemeDecorator(Theme.DARK)]
