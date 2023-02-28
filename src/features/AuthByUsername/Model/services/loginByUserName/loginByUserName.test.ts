import axios from "axios"
import { Dispatch } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { loginUserByUserName } from "./loginUserByUserName"
import { userActions } from "entities/User"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk"

// мокаю модуль
jest.mock('axios')
// jest для замоканных модулей добавляет функции(напрмер mockReturnValue), которые позволяют возвращать какое-то замоканное значение
// чтобы ТС подхватывал нужные методы, нужно использовать jest.mocked(Название модуля, true), второй аргумент true это флаг, который указывает на глубокий mock, то есть я мокаю не только сам модуль, но и внутренние поля
const mockedAxios = jest.mocked(axios, true)
describe('loginByUserName.test', () => {
	let dispatch: Dispatch
	let getState: () => StateSchema;
	beforeEach(() => {
		dispatch = jest.fn()
		getState = jest.fn()
	})
	test('login success', async () => {
		const userData = { username: 'admin', id: '1' }
		// замокал ответ от сервера
		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userData }))
		// createAsyncThunk - это экшен криейтор, то есть после вызова он возвращает экшн, далее экш попадает в диспатч и мы возвращаем какие-то данные
		const action = loginUserByUserName({ username: 'admin', password: '123' })
		// получившийся экш принимает: первым аргументом диспатч, вторым getState, третьим - extra.
		// опять же, на нужен диспатч и getState и следовательно нам их нужно замокать. Перенесу код в beforeEach, чтобы во всех тестах имел доступ
		// сам экшн нужно сделать асинхонным, потому что createAsyncThunk асинхронная функция
		const result = await action(dispatch, getState, undefined)
		// кстати, если я не добавлю await, то в result окажется промис, потому что action асинхронная штука. Но с await я получу обычный санковый экш с payload, type, meta
		// проверим что был вызван диспатч с определенным экшентом у которого определенный аргумент
		expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData))
		// проверяю что диспатч всего вызвался 3 раза. Первый раз - вызов loginUserByUserName, второй userActions.setAuthData, третий когда происходит fulfilled(то есть когда происходит return loginUserByUserName)
		expect(dispatch).toHaveBeenCalledTimes(3)
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('fulfilled')
	}),
		
	test('login failed', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))
		const action = loginUserByUserName({ username: 'admin', password: '123' })
		const result = await action(dispatch, getState, undefined)
		expect(dispatch).toHaveBeenCalledTimes(2)
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('rejected')
	})
	// создал отдельный класс для инкапсуляции все движухи и dry
	test('should login success (TestAsyncThunk class)', async () => { 
		const userData = { username: 'admin', id: '1' }
		// замокал ответ от сервера
		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userData }))
		const thunkEntity = new TestAsyncThunk(loginUserByUserName)
		const result = await thunkEntity.callThunk({ username: 'admin', password: '123' })

		expect(thunkEntity.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData))
		expect(thunkEntity.dispatch).toHaveBeenCalledTimes(3)
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('fulfilled')
	}),
	test('should login failed(TestAsyncThunk class)', async () => { 
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
		const thunk = new TestAsyncThunk(loginUserByUserName)
		const result = await thunk.callThunk({ username: 'admin', password: '123' })

		expect(thunk.dispatch).toHaveBeenCalledTimes(2)
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('rejected')
	 })
	
})