import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_ID_LS_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlag } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/JsonSettings'
import { initAuthData } from '../services/initAuthData'

const initialState: UserSchema = {
	_mounted: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload
			// обновляю флаги фич
			setFeatureFlag(action.payload.features)
			localStorage.setItem(USER_ID_LS_KEY, action.payload.id)
			state._mounted = true
		},

		logout: (state) => {
			state.authData = undefined
			localStorage.removeItem(USER_ID_LS_KEY)
		}
	},
	extraReducers: (builder) => {
		builder
			// .addCase(
			// 	saveJsonSettings.pending,
			// 	(state) => {
			// 		state.error = undefined
			// 		state.isLoading = true
			// 	})
			.addCase(
				saveJsonSettings.fulfilled,
				(state, action: PayloadAction<JsonSettings>) => {
					if (state.authData) {
						state.authData.jsonSettings = action.payload
					}
				})
			.addCase(
				initAuthData.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.authData = action.payload
					setFeatureFlag(action.payload.features)
					state._mounted = true
				})
			.addCase(
				initAuthData.rejected,
				(state) => {
					state._mounted = true
				})
		// .addCase(
		// 	saveJsonSettings.rejected,
		// 	(state, action) => {
		// 		state.isLoading = false;
		// 		state.error = action.payload;
		// 	})
	}
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice