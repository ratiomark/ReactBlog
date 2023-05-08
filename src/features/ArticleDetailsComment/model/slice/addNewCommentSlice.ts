import { buildSlice } from '@/shared/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddNewCommentSchema } from '../types/AddNewComment'

const initialState: AddNewCommentSchema = {
	text: ''
}

const addNewCommentSlice = buildSlice({
	name: 'addNewComment',
	initialState,
	reducers: {
		setCommentText: (state, action: PayloadAction<string>) => {
			state.text = action.payload
		},
	},
})

export const { actions: addNewCommentActions } = addNewCommentSlice
export const { useActions: useAddNewCommentSliceActions } = addNewCommentSlice
export const { reducer: addNewCommentReducer } = addNewCommentSlice