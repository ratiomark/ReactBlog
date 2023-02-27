import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithReducerManager } from 'app/providers/StoreProvider'
import { StateSchemaReducersKeys } from 'app/providers/StoreProvider/config/StateSchema'
import { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

export type ReducersList = {
	[reducerName in StateSchemaReducersKeys]?: Reducer
}
type ReducersListEntry = [StateSchemaReducersKeys, Reducer]

interface useAsyncReducerProps {
	reducers: ReducersList
	removeAfterUnmount?: boolean
}

export const useAsyncReducer = (props: useAsyncReducerProps) => {
	const { reducers, removeAfterUnmount = true } = props

	const dispatch = useDispatch()
	const store = useStore() as ReduxStoreWithReducerManager

	useEffect(() => {
		Object.entries(reducers).forEach(
			([reducerName, reducer]: ReducersListEntry) => {
				store.reducerManager.add(reducerName, reducer)
				dispatch({ type: `@INIT ${reducerName} reducer` })
			}
		)

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(
					([reducerName, reducer]: ReducersListEntry) => {
						store.reducerManager.remove(reducerName)
						dispatch({ type: `@DESTROY ${reducerName} reducer` })
					}
				)
			}
		}
		//eslint-disable-next-line
	}, [])

	return { dispatch, store }
}
