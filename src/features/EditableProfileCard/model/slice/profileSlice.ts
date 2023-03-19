import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InputErrorData } from 'shared/lib/helpers/validation/validationErrorTexts'
import { fetchProfileData } from '../services/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData'
import { Profile, ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
	form: undefined,
	inputErrors: false,
	inputErrorsData: undefined
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		updateProfileForm: (state, action) => {
			state.form = { ...state.form, ...action.payload }
		},
		cancelEditProfileData: (state) => {
			state.readonly = true
			state.form = state.data
			state.inputErrorsData = {}
			state.inputErrors = false
		},
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload
		},
		setInputErrors: (state, action: PayloadAction<any>) => {
			state.inputErrorsData = { ...state.inputErrorsData, ...action.payload }
		},

		checkInputErrors: (state) => {
			for (const key in state.inputErrorsData) {
				if (state.inputErrorsData[key].length > 0) {
					state.inputErrors = true
					return
				}
			}
			state.inputErrors = false
		},

		setInputErrorsTrue: (state) => {
			state.inputErrors = true
		},
		setInputErrorsFalse: (state) => {
			state.inputErrors = false
		},
	},
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
					state.data = action.payload
					state.form = action.payload
				})
			.addCase(
				fetchProfileData.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})
			.addCase(
				updateProfileData.pending,
				(state) => {
					state.error = undefined
					state.isLoading = true
				})
			.addCase(
				updateProfileData.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.isLoading = false
					state.data = action.payload
					state.form = action.payload
				})
			.addCase(
				updateProfileData.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})

	}
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice