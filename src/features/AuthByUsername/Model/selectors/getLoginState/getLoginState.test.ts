import { StateSchema } from 'app/providers/StoreProvider'
import {
	getLoginError,
	getLoginIsLoading,
	getLoginPassword,
	getLoginUsername,
} from './getLoginState'

describe('getLoginState.test ', () => {
	test('getLoginError: should return error', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				error: 'Error',
			},
		}
		expect(getLoginError(state as StateSchema)).toEqual('Error')
	}),

	test('getLoginError: should work with ampty state', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginError(state as StateSchema)).toEqual(undefined)
	}),
	test('getLoginIsLoading: should return true', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				isLoading: true,
			},
		}
		expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
	}),

	test('getLoginIsLoading: should work with empty state return false', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
	}),

	test('getLoginUsername: should return "admin"', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				username: 'admin',
			},
		}
		expect(getLoginUsername(state as StateSchema)).toEqual('admin')
	}),

	test('getLoginUsername: should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginUsername(state as StateSchema)).toEqual('')
	}),

	test('getLoginPassword: should return "123"', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				password: '123',
			},
		}
		expect(getLoginPassword(state as StateSchema)).toEqual('123')
	}),

	test('getLoginPassword: should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginPassword(state as StateSchema)).toEqual('')
	})
})
