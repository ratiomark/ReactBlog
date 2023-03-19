import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentSchema } from '../types/comment'

const initialState: CommentSchema = {
	id: '12'
}

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: commentActions } = commentSlice
export const { reducer: commentReducer } = commentSlice