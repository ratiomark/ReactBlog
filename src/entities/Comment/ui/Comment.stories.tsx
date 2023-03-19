import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Comment } from './Comment';

export default {
	title: 'entity/Comment',
	component: Comment,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
