import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ArticleImageComponent } from './ArticleImageComponent';
import { Theme } from '@/shared/types/Theme';

export default {
	title: 'entities/ArticleImageComponent',
	component: ArticleImageComponent,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleImageComponent>;

const Template: ComponentStory<typeof ArticleImageComponent> = (args) => <ArticleImageComponent {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	block: {
		'id': '8',
		'type': 'IMAGE',
		'src': 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
		'title': 'Рисунок 1 - скриншот сайта'
	},
};
export const Dark = Template.bind({});
Dark.args = {
	block: {
		'id': '8',
		'type': 'IMAGE',
		'src': 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
		'title': 'Рисунок 1 - скриншот сайта'
	},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)]