import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk'
import { fetchProfileData } from './fetchProfileData'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

const data = {
	firstname: 'Alex',
	lastname: 'Johns',
	username: 'admin of God',
	age: 22,
	country: Country.Russia,
	city: 'Haifa',
	currency: Currency.eur,
	avatar: 'sakfe'
}
describe('fetchProfileData.test', () => {
	test('success fetch (TestAsyncThunk class)', async () => {
		const userData = { username: 'admin', id: '1' }
		// замокал ответ от сервера
		const thunkEntity = new TestAsyncThunk(fetchProfileData)
		thunkEntity.api.get.mockReturnValue(Promise.resolve({ data: data }))
		const result = await thunkEntity.callThunk('1')
		expect(thunkEntity.api.get).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('fulfilled')
		expect(result.payload).toEqual(data)
	});
	test('fetch failed(TestAsyncThunk class)', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData)
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
		const result = await thunk.callThunk('1')
		expect(result.meta.requestStatus).toBe('rejected')
		// expect(result.payload).toEqual(403)

	});

})