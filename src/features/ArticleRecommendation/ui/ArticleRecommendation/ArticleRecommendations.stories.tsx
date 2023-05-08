export { }
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ArticleRecommendation } from './ArticleRecommendation';

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
	title: 'features/ArticleRecommendations2',
	component: ArticleRecommendation,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	// withMock нужен чтобы я мог замокать запрос	
	decorators: [ StoreDecorator({})]
} as ComponentMeta<typeof ArticleRecommendation>;

const Template: ComponentStory<typeof ArticleRecommendation> = (args) => <ArticleRecommendation {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.parameters = {
	mockData: [
		{
			url: `${__API__}/articles?_limit=4`,
			method: 'GET',
			status: 200,
			response: {
				data: [
					{ ...article, id: '1' },
					{ ...article, id: '2' },
					{ ...article, id: '3' },
				]
			}
		}
	]
}