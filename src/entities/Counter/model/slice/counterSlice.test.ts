	import { StateSchema } from 'app/providers/StoreProvider'
import { CounterSchema } from '../types/counterSchema'
import { counterActions, counterReducer } from './counterSlice'

describe('counterSlice.test', () => {
	test('increment test', () => {
		const state: DeepPartial<CounterSchema> = { value: 5 }
		expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ value: 6 })
	});
	test('decrement test', () => {
		const state: DeepPartial<CounterSchema> = { value: 5 }
		expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: 4 })
	});
	test('empty state test', () => {
		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
	});
})