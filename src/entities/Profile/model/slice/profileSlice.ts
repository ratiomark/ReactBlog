import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileData } from '../services/fetchProfileData'
import { Profile, ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchProfileData.pending,
				(state) => {
					state.error = undefined
					state.isLoading = true
				})
			.addCase(
				fetchProfileData.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.isLoading = false
					state.readonly = false
					state.data = action.payload
				})
			.addCase(
				fetchProfileData.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})

	}
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice