// import { DeepPartial } from "@reduxjs/toolkit"
// import { StateSchema } from "app/providers/StoreProvider"
// import { UserSchema } from "../types/user"
// import { counterActions, counterReducer } from "./userSlice"

// describe('counterSlice.test', () => {
// 	test('increment test', () => {
// 		const state: DeepPartial<CounterSchema> = { value: 5 }
// 		expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ value: 6 })
// 	});
// 	test('decrement test', () => {
// 		const state: DeepPartial<CounterSchema> = { value: 5 }
// 		expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: 4 })
// 	});
// 	test('empty state test', () => {
// 		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
// 	});
// })