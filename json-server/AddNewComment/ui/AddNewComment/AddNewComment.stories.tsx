import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddNewComment } from './AddNewComment';

export default {
	title: 'entity/AddNewComment',
	component: AddNewComment,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AddNewComment>;

const Template: ComponentStory<typeof AddNewComment> = (args) => <AddNewComment {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
