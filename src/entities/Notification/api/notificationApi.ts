import { rtkApi } from '@/shared/api/rtkApi'
import { Notification } from '../model/types/notification'

const notificationApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getNotifications: build.query<Notification[], null>({
			query: () => ({
				url: '/notifications',
			})
		})
	}),
})
// автосгенерированный кух, который использует названия эндпоинта 
export const { useGetNotificationsQuery: useNotification } = notificationApi
// или можно так:
// const useNotification = notificationApi.useGetNotificationsQuery
