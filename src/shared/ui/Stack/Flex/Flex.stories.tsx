import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
	title: 'shared/Flex',
	component: Flex,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
	justify: 'start',
	gap: 'gap_8',
	align: 'center',
	children: (
		<>
			<div>1</div>
			<div>3</div>
			<div>2</div>
		</>
	),
	// max: true,
};
export const Column = Template.bind({});
Column.args = {
	justify: 'center',
	gap: 'gap_16',
	align: 'center',
	direction: 'column',
	children: (
		<>
			<div>1</div>
			<div>3</div>
			<div>2</div>
		</>
	),
	max: true,
};
