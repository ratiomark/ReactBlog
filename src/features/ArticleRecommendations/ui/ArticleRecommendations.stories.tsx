export { }
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import withMock from 'storybook-addon-mock'
import { ArticleRecommendations } from './ArticleRecommendations';

const article: Article = {
	id: '1',
	img: '',
	createdAt: '',
	views: 123,
	user: { username: 'admin', 'id': '1' },
	blocks: [],
	type: [],
	title: 'java',
	subtitle: 'хуява'
}

export default {
	title: 'features/ArticleRecommendation',
	component: ArticleRecommendations,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	// withMock нужен чтобы я мог замокать запрос	
	decorators: [withMock]
} as ComponentMeta<typeof ArticleRecommendations>;

const Template: ComponentStory<typeof ArticleRecommendations> = (args) => <ArticleRecommendations {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
	mockData: [
		{
			url: `${__API__}/articles?_limit=3&_expand=user`,
			method: 'GET',
			status: 200,
			response: [
				{ ...article, id: '1' },
				{ ...article, id: '2' },
				{ ...article, id: '3' },
			],
		},
	],
};