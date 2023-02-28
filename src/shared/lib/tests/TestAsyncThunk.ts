import { AsyncThunkAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>
	getState: () => StateSchema
	actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>
	// тут конструктор принимает асинхронный actionCreator, например loginUserByUserName и этот экш криэйтер типизируется также как я типизровал loginUserByUserName, то есть: что_возвращает, что_принимает, что_реждектит
	constructor(actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>) {
		this.actionCreator = actionCreator
		this.dispatch = jest.fn()
		this.getState = jest.fn()

	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg)
		const result = await action(this.dispatch, this.getState, undefined)
		return result
	}

}
// можно было бы использовать конструкцию ниже, чтобы не писать каждый раз длинное выражение типов
// type ActionCreatorType<Return, Arg, RejectedValue > = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>