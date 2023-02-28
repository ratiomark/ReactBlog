import { AnyAction, CombinedState, combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, StateSchemaReducersKeys } from './StateSchema'


export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaReducersKeys, reducer: Reducer) => void
  remove: (key: StateSchemaReducersKeys) => void
}


export function createReducerManager
(initialReducers: ReducersMapObject<StateSchema>)
  : IReducerManager {
	const reducers = { ...initialReducers }
	let combinedReducer = combineReducers(reducers)

	let keysToRemove: StateSchemaReducersKeys[] = []

	return {
		getReducerMap: () => reducers,
		// возвращает стейт
		reduce: (state: StateSchema, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state }
				for (const key of keysToRemove) {
					delete state[key]
				}
				keysToRemove = []
			}
			return combinedReducer(state, action)
		},

		add: (key: StateSchemaReducersKeys, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return
			}
			reducers[key] = reducer
			combinedReducer = combineReducers(reducers)
		},

		remove: (key: StateSchemaReducersKeys) => {
			if (!key || !reducers[key]) {
				return
			}
			delete reducers[key]
			keysToRemove.push(key)
			combinedReducer = combineReducers(reducers)
		}
	}
}

