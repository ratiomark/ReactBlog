import { rtkApi } from '@/shared/api/rtkApi'
import { JsonSettings } from '../types/JsonSettings'
import { User } from '../types/user'

interface SetJsonSettings {
	userId: string
	jsonSettings: JsonSettings
}


const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		// mutation потому что буду патчить изенения. Получаю юзера, аргументом SetJsonSettings
		setJsonSettings: build.mutation<User, SetJsonSettings>({
			query: ({ userId, jsonSettings }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					jsonSettings
				}
			})
		}),
		getUserDataById: build.query<User, string>({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: 'GET',
			})
		})
	}),
})

// позволяет получить определенный эндпоинт и использовать его. К примеру я юзаю его в thunk saveJsonSetting так:
// dispatch(setJsonSettingsMutation({ jsonSettings, userId: userData.id }))
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate