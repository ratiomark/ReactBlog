import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/Model/slice/loginSlice'
/* eslint-disable*/

// Сюда добавляю асинхронные редьюсеры, чтобы можно было сторибукать компоненты в которых они используются
const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginReducer,
}

export const StoreDecorator =
	(
		state: DeepPartial<StateSchema>,
		asyncReducersArg?: ReducersMapObject<StateSchema>
	) =>
	(StoryComponent: Story) => (
		<StoreProvider
			initialState={state as StateSchema}
			asyncReducers={{
				...defaultAsyncReducers as ReducersMapObject<StateSchema>,
				...asyncReducersArg,
			}}
		>
			<StoryComponent />
		</StoreProvider>
	)
