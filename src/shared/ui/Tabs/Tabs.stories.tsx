import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Tabs } from './Tabs';

export default {
	title: 'shared/Tabs',
	component: Tabs,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	tabs: [
		{
			value: 'value1',
			content: 'Tab1'
		},
		{
			value: 'value2',
			content: 'Tab2'
		},
		{
			value: 'value3',
			content: 'Tab3'
		},
	],
	value: 'value2',
	onTabClick: action('onTabClick'),
};
