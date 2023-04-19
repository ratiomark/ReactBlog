import { StateSchema } from '@/app/providers/StoreProvider'
import { CounterSchema } from '../../types/counterSchema'
import { getCounter } from '../getCounter/getCounter'
import { getCounterValue } from './getCounterValue'


describe('getCounterValue', () => {
	test('should return counter value', () => {
		const state: DeepPartial<StateSchema> = {
			counter: { value: 5 }
		}
		expect(getCounterValue(state as StateSchema)).toEqual(5)
	})
})


