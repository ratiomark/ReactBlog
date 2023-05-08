import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { [FTName]Schema } from '../types/[FTName]Schema'

const initialState: [FTName]Schema = {

}

const [FTName| lowercasefirstchar]Slice = createSlice({
	name: '[FTName | lowercasefirstchar]',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: [FTName| lowercasefirstchar]Actions } = [FTName | lowercasefirstchar]Slice
export const { reducer: [FTName| lowercasefirstchar]Reducer } = [FTName | lowercasefirstchar]Slice