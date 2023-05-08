import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/types/Theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ArticleCodeComponent } from './ArticleCodeComponent';

export default {
	title: 'entities/ArticleCodeComponent',
	component: ArticleCodeComponent,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleCodeComponent>;

const Template: ComponentStory<typeof ArticleCodeComponent> = (args) => <ArticleCodeComponent {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	block: {
		'id': '3',
		'type': 'CODE',
		'code': "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
	},
};

export const Dark = Template.bind({});
Dark.args = {
	block: {
		'id': '3',
		'type': 'CODE',
		'code': "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
	},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)]