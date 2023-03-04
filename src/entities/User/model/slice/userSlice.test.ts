import { UserSchema } from '../types/user'
import { userActions, userReducer } from './userSlice'

const setLocalStorage = (id: string, data: any) => {
	window.localStorage.setItem(id, JSON.stringify(data));
}

describe('userSlice.test', () => {
	test('set auth data', () => {
		const state: DeepPartial<UserSchema> = {}
		expect(userReducer(state as UserSchema, userActions.setAuthData({ id: '5', username: 'admin' })))
			.toEqual({ authData: { id: '5', username: 'admin' } })
	})

	test('init auth data', () => {
		const state: DeepPartial<UserSchema> = {}
		const id = '5'
		const data = { id: '5', username: 'admin' }
		setLocalStorage(id, data)
		expect(localStorage.getItem(id)).toEqual(JSON.stringify(data));
		// expect(userReducer(state as UserSchema, userActions.initAuthData())).toEqual(data)
		// expect(userReducer(state as UserSchema, userActions.setAuthData({ id: '5', username: 'admin' })))
		// 	.toEqual({ authData: { id: '5', username: 'admin' } })
	});
	test('logout', () => {
		const state: DeepPartial<UserSchema> = { authData: { id: '5', username: 'admin' } }
		expect(userReducer(state as UserSchema, userActions.logout()))
			.toEqual({ 'authData': undefined })
	})
})