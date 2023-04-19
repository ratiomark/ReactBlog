import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '../types/profile'
import { getProfileData } from './getProfileData'
import { getProfileError } from './getProfileError'

// const data = {
// 	firstname: 'Alex',
// 	lastname: 'Johns',
// 	username: 'admin of God',
// 	age: 22,
// 	country: Country.Russia,
// 	city: 'Haifa',
// 	currency: Currency.eur,
// 	avatar: 'sakfe'
// }

describe('getProfileData.test ', () => {

	test('getProfileData: should data object', () => {
		const data: Profile = {
			id: '1',
			firstname: 'Alex',
			lastname: 'Johns',
			username: 'admin of God',
			age: 22,
			country: 'Russia',
			city: 'Haifa',
			currency: 'eur',
			avatar: 'sakfe'
		}
		const state: DeepPartial<StateSchema> = {
			profile: {
				data
			},
		}
		expect(getProfileData(state as StateSchema)).toEqual(data)
	});
	test('getProfileError: should return error', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				error: 'someError'
			},
		}
		expect(getProfileError(state as StateSchema)).toEqual('someError')
	})
})
// test('getLoginError: should work with ampty state', () => {
// 	const state: DeepPartial<StateSchema> = {}
// 	expect(getLoginError(state as StateSchema)).toEqual(undefined)
// }),
// test('getLoginIsLoading: should return true', () => {
// 	const state: DeepPartial<StateSchema> = {
// 		loginForm: {
// 			isLoading: true,
// 		},
// 	}
// 	expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
// }),

// test('getLoginIsLoading: should work with empty state return false', () => {
// 	const state: DeepPartial<StateSchema> = {}
// 	expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
// }),

// test('getLoginUsername: should return "admin"', () => {
// 	const state: DeepPartial<StateSchema> = {
// 		loginForm: {
// 			username: 'admin',
// 		},
// 	}
// 	expect(getLoginUsername(state as StateSchema)).toEqual('admin')
// }),

// test('getLoginUsername: should work with empty state', () => {
// 	const state: DeepPartial<StateSchema> = {}
// 	expect(getLoginUsername(state as StateSchema)).toEqual('')
// }),

// test('getLoginPassword: should return "123"', () => {
// 	const state: DeepPartial<StateSchema> = {
// 		loginForm: {
// 			password: '123',
// 		},
// 	}
// 	expect(getLoginPassword(state as StateSchema)).toEqual('123')
// }),

// test('getLoginPassword: should work with empty state', () => {
// 	const state: DeepPartial<StateSchema> = {}
// 	expect(getLoginPassword(state as StateSchema)).toEqual('')
// })

