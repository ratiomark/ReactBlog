import { AsyncThunkAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import axios, { AxiosStatic } from 'axios'


jest.mock('axios')
// jest для замоканных модулей добавляет функции(напрмер mockReturnValue), которые позволяют возвращать какое-то замоканное значение
// чтобы ТС подхватывал нужные методы, нужно использовать jest.mocked(Название модуля, true), второй аргумент true это флаг, который указывает на глубокий mock, то есть я мокаю не только сам модуль, но и внутренние поля
const mockedAxios = jest.mocked(axios, true)

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>
	getState: () => StateSchema
	actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>
	api: jest.MockedFunctionDeep<AxiosStatic>
	// тут конструктор принимает асинхронный actionCreator, например loginUserByUserName и этот экш криэйтер типизируется также как я типизровал loginUserByUserName, то есть: что_возвращает, что_принимает, что_реждектит
	constructor(
		actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>,
		state?: DeepPartial<StateSchema>
	) {
		this.actionCreator = actionCreator
		this.dispatch = jest.fn()
		this.getState = jest.fn(() => state as StateSchema)
		this.api = mockedAxios
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg)
		const result = await action(
			this.dispatch,
			this.getState,
			{ api: this.api }
		)
		return result
	}

}
// можно было бы использовать конструкцию ниже, чтобы не писать каждый раз длинное выражение типов
// type ActionCreatorType<Return, Arg, RejectedValue > = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>