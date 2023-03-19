import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Skeleton } from './Skeleton';

export default {
	title: 'shared/Skeleton',
	component: Skeleton,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	width: '90%',
	height: 30,
};

export const Circle = Template.bind({});
Circle.args = {
	borderRadius: '50%',
	width: 100,
	height: 100,
};

export const NormalDark = Template.bind({});
NormalDark.args = {
	width: '90%',
	height: 30,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
	borderRadius: '50%',
	width: 100,
	height: 100,
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];