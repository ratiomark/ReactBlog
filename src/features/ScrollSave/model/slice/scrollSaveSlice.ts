import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScrollSaveSchema, UISchema } from '../types/ScrollSaveSchema'

const initialState: UISchema = {
	scroll: {}
}

const uiSlice = createSlice({
	name: 'UISlice',
	initialState,
	reducers: {
		setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
			state.scroll[action.payload.path] = action.payload.position
		},
	},

})

export const { actions: uiActions } = uiSlice
export const { reducer: uiReducer } = uiSlice