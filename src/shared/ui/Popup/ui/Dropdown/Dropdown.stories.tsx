import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';

export default {
	title: 'shared/Dropdown',
	component: Dropdown,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [
		(Story) => <div style={{ padding: 100 }}><Story /></div>,
	],
	args: {
		trigger: <Button>Open!</Button>,
		items: [
			{ content: 'Some item 1' },
			{ content: 'Some item 2' },
			{ content: 'Some item 3' },
		],
	}
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const TopLeft = Template.bind({});
TopLeft.args = {
	listDirection: 'top_left'
};

export const TopRight = Template.bind({});
TopRight.args = {
	listDirection: 'top_right'
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
	listDirection: 'bottom_left'
};

export const BottomRight = Template.bind({});
BottomRight.args = {
	listDirection: 'bottom_right'
};