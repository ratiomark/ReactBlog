import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/user'

const initialState: UserSchema = {
	_mounted: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload
		},
		initAuthData: (state) => {
			const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY)
			if (userData) {
				state.authData = JSON.parse(userData)
			}
			state._mounted = true
		},
		logout: (state) => {
			state.authData = undefined
			localStorage.removeItem(USER_LOCALSTORAGE_KEY)
		}
	},
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice