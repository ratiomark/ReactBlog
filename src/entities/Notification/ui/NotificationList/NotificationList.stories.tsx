import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from './NotificationList';

export default {
	title: 'entities/NotificationList',
	component: NotificationList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators = [
	StoreDecorator({})
]
Normal.parameters = {
	mockData: [
		{
			url: `${__API__}/notifications`,
			method: 'GET',
			status: 200,
			response: [
				{
					id: '1',
					title: 'notification 1',
					description: 'description of notification'
				},
				{
					id: '2',
					title: 'notification 1',
					description: 'description of notification'
				},
				{
					id: '3',
					title: 'notification 1',
					description: 'description of notification'
				},
			]
		}
	]
}