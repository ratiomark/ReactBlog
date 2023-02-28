import { EnhancedStore } from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { IReducerManager } from './reducerManager';


// loginForm делаю не обязательным, таким образом я могу подружать его позже с помощью асинхронна и ТС не будет ругаться на то что я не объявил его в rootReducers
export interface StateSchema {
	counter: CounterSchema,
	user: UserSchema,
	
	
	// async reducers
	loginForm?: LoginSchema
}

// достаю ключи редьюсеров, чтобы передать их reducerManager, там где требуются ключи
export type StateSchemaReducersKeys = keyof StateSchema

// создаю тип для для стора, чтобы расширить стандартный стор. Стор возвращает тип EnhancedStore, так например при создании стора со схемой StateSchema, я увижу, что мой стор имеет
// const store: EnhancedStore<StateSchema, AnyAction, [ThunkMiddleware<S, AnyAction, undefined>]>
// тип  reducerManager, чтобы добавить его в стор
export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema> {
	reducerManager: IReducerManager
}