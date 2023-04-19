import { ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { profileReducer } from '@/features/EditableProfileCard'
import { loginReducer } from '@/features/AuthByUsername'
import { ReducersList } from '@/shared/lib/helpers/hooks/useAsyncReducer'
import { articleDetailsReducer } from '@/entities/Article'
import { addNewCommentReducer } from '@/features/ArticleDetailsComment'
import { articleDetailsCommentsReducer } from '@/features/ArticleDetailsComment/model/slice/articleDetailsCommentsSlice'
import { articlesPageReducer } from '@/features/ArticleList/model/slice/articlePageSlice'
// import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlePageSlice'
/* eslint-disable*/

// Сюда добавляю асинхронные редьюсеры, чтобы можно было сторибукать компоненты в которых они используются
const defaultAsyncReducers: ReducersList = {
	// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addNewComment: addNewCommentReducer,
	articleDetailsComments: articleDetailsCommentsReducer,
	articlesPage: articlesPageReducer,

}

export const StoreDecorator =
	(
		state: DeepPartial<StateSchema>,
		asyncReducersArg?: ReducersList
		// включил этот вариант, потому что иначе [reducerName in StateSchemaReducersKeys]?: Reducer<NonNullable<StateSchema[reducerName]>> из useAsyncReducer не работает
		// asyncReducersArg?: ReducersMapObject<StateSchema>
	) =>
		(StoryComponent: Story) =>
		(
			<StoreProvider
				initialState={state as StateSchema}
				asyncReducers={{
					...(defaultAsyncReducers as ReducersMapObject<StateSchema>),
					...(asyncReducersArg as ReducersMapObject<StateSchema>),
				}}
			>
				<StoryComponent />
			</StoreProvider>
		)
