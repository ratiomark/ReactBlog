import { ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { profileReducer } from 'features/EditableProfileCard'
import { loginReducer } from 'features/AuthByUsername/Model/slice/loginSlice'
import { ReducersList } from 'shared/lib/helpers/hooks/useAsyncReducer'
import { articleDetailsReducer } from 'entities/Article'
/* eslint-disable*/

// Сюда добавляю асинхронные редьюсеры, чтобы можно было сторибукать компоненты в которых они используются
const defaultAsyncReducers: ReducersList = {
	// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
}

export const StoreDecorator =
	(
		state: DeepPartial<StateSchema>,
		asyncReducersArg?: ReducersList
		// asyncReducersArg?: ReducersMapObject<StateSchema>
	) =>
		(StoryComponent: Story) =>
		(
			<StoreProvider
				initialState={state as StateSchema}
				asyncReducers={{
					...(defaultAsyncReducers as ReducersMapObject<StateSchema>),
					...asyncReducersArg,
				}}
			>
				<StoryComponent />
			</StoreProvider>
		)
