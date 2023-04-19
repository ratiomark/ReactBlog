import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';



export const $api = axios.create({
	baseURL: __API__,
	// изначально заголовочная часть была тут, но перенес ее в интерцептор
	// headers: {
	// 	authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
	// }
})

// создаю интерцептор, который будет отрабатыватся каждый раз перед тем как проходит запрос

$api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
	}
	return config
})