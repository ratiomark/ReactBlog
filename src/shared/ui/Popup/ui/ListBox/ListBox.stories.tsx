import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
	title: 'shared/ListBox',
	component: ListBox,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [
		(Story) => <div style={{ padding: 100 }}><Story /></div>,
	],
	args: {
		value: '123',
		items: [
			{ content: 'Some item 1', value: '123' },
			{ content: 'Some item 2', value: '1232' },
			{ content: 'Some item 3', value: '1232' },
		],
	}
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

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
