import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Code } from './Code';

export default {
	title: 'shared/Code',
	component: Code,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	codeData: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
};
