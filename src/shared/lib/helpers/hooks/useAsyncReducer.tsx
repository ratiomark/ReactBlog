import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithReducerManager } from '@/app/providers/StoreProvider'
import { StateSchema, StateSchemaReducersKeys } from '@/app/providers/StoreProvider'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import { useAppDispatch } from './useAppDispatch'

export type ReducersList = {
	[reducerName in StateSchemaReducersKeys]?: Reducer<NonNullable<StateSchema[reducerName]>>
	// [reducerName in StateSchemaReducersKeys]?: Reducer<StateSchema[reducerName]>
	// [reducerName in StateSchemaReducersKeys]?: Reducer
}
type ReducersListEntry = [StateSchemaReducersKeys, Reducer]

interface useAsyncReducerProps {
	reducers: ReducersList
	removeAfterUnmount?: boolean
}

export const useAsyncReducer = (props: useAsyncReducerProps) => {
	const { reducers, removeAfterUnmount = true } = props

	const dispatch = useAppDispatch()
	const store = useStore() as ReduxStoreWithReducerManager

	useEffect(() => {
		const mountedReducers = store.reducerManager.getMountedReducers()

		Object.entries(reducers).forEach(
			([reducerName, reducer]) => {
				const mounted = mountedReducers[reducerName as StateSchemaReducersKeys]
				// добавляем редьюсер, только если он еще не вмонтирован
				if (!mounted) {
					store.reducerManager.add(reducerName as StateSchemaReducersKeys, reducer)
					dispatch({ type: `@INIT ${reducerName} reducer` })
				}
			}
		)

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(
					([reducerName, reducer]) => {
						store.reducerManager.remove(reducerName as StateSchemaReducersKeys)
						dispatch({ type: `@DESTROY ${reducerName} reducer` })
					}
				)
			}
		}
		//eslint-disable-next-line
	}, [])

	return { dispatch, store }
}
