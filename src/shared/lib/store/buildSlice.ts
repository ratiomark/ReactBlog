import { bindActionCreators, createSlice, } from '@reduxjs/toolkit'
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

// теперь функцию buildSlice можно юзать вместо createSlice. При этом buildSlice возвращает допоплнительный хук useActions, вызов которого позволяет доставать экшены с уже обернутым диспатчем
// const {action1, action2} = useActions()

export function buildSlice<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string
	>(options: CreateSliceOptions<State, CaseReducers, Name>) {
	const slice = createSlice(options)

	const useActions = (): typeof slice.actions => {
		const dispatch = useDispatch()

		// @ts-ignore
		return useMemo(()=> bindActionCreators(slice.actions, dispatch), [dispatch])
	}

	return {
		...slice,
		useActions
	}
}