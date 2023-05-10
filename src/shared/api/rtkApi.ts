import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_ID_LS_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

export const rtkApi = createApi({
	// уникальное имя для сервиса, который будет встроенн в стор
	reducerPath: 'myApi',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		// функция интерцептор, которая ?(будет добавлять соответствующий хедер в наш конфиг)?
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(USER_ID_LS_KEY) || ''
			if (token) {
				// добавляем поле Authorization в хедеры, потому что наш сервер использует этот заголовок как факт наличия авторизации
				headers.set('Authorization', token)
			}
			return headers
		}
	}),
	endpoints: (build) => ({})
	// обычно указывают эндпоинты в том же месте где создают API, но я хочу сделать так, чтобы эндпоинты инджектились асинхроно снаружи, тогда когда это требуется. То есть я разбиваю API на такие же чанки как и асинхронную подгрузку редьюсеров. Обычный вариант ниже
	// endpoints: (build) => ({
	// 	getPokemonById: build.query<Pokemon, string>({
	// 		query: (id) => `pokemon/${id}`
	// 	})	
	// }),
})
// А вот так я смогу инджектить энпоинт из другого места
// const extendedApi = rtkApi.injectEndpoints({
// endpoints: (build)=> ({
// getPokemonById: build.query<Pokemon, string>({
// query: (id) => `pokemon/${id}`
// })
// }),
// // // overrideExisting: false,
// })

// const notificationApi = rtkApi.injectEndpoints({
// 	endpoints: (build) => ({
// 		getNotifications: build.query<Notification[], null>({
// 			query: () => ({
// 				url: '/notifications',
// 			})
// 		})
// 	}),
// })
// // автосгенерированный кух, который использует названия эндпоинта
// export const { useGetNotificationsQuery: useNotification } = notificationApi