import { EnhancedStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { AddNewCommentSchema } from '@/features/ArticleDetailsComment';
import { IReducerManager } from './reducerManager';
import { ArticlesPageSchema } from '@/features/ArticleList';
import { UISchema } from '@/features/ScrollSave';
import { ArticleDetailsCommentsSchema } from '@/features/ArticleDetailsComment'
import { ArticleDetailsRecommendationSchema } from '@/features/ArticleRecommendation';
import { rtkApi } from '@/shared/api/rtkApi';

// loginForm делаю не обязательным, таким образом я могу подружать его позже с помощью асинхронна и ТС не будет ругаться на то что я не объявил его в rootReducers
export interface StateSchema {
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
	counter: CounterSchema
	user: UserSchema

	ui: UISchema

	// async reducers
	loginForm?: LoginSchema
	profile?: ProfileSchema
	
	articleDetails?: ArticleDetailsSchema
	
	articleRecommendations?: ArticleDetailsRecommendationSchema
	
	articleDetailsComments?: ArticleDetailsCommentsSchema
	addNewComment?: AddNewCommentSchema

	articlesPage?: ArticlesPageSchema
}

// достаю ключи редьюсеров, чтобы передать их reducerManager, там где требуются ключи
export type StateSchemaReducersKeys = keyof StateSchema

// создаю тип для для стора, чтобы расширить стандартный стор. Стор возвращает тип EnhancedStore, так например при создании стора со схемой StateSchema, я увижу, что мой стор имеет
// const store: EnhancedStore<StateSchema, AnyAction, [ThunkMiddleware<S, AnyAction, undefined>]>
// тип  reducerManager, чтобы добавить его в стор
export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema> {
	reducerManager: IReducerManager
}

// этот тип описывает аргумент для экстра параметра у Thunk
export interface ThunkExtraArg {
	api?: AxiosInstance
}