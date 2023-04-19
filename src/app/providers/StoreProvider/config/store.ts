import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { uiReducer } from '@/features/ScrollSave';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>) {
	// передавая схему стейта в ReducersMapObject я сообщаю TS какие редьюсеры должны быть.
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
		ui: uiReducer,
		// а это редьюсер, который создает RTKQuery с помощь createApi, чтобы ТС не ругался, но добавить в схему
		// [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
		[rtkApi.reducerPath]: rtkApi.reducer
	}

	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		// reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: {
					api: $api
				}
			}
		})
			// нужно добавить мидлварину, чтобы подключить RTK api
			.concat(rtkApi.middleware)
	})

	//@ts-ignore
	store.reducerManager = reducerManager
	return store
}
// type store = typeof createReduxStore

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
// type rootState = ReturnType<typeof createReduxStore>['dispatch']
// export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
