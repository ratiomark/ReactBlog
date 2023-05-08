import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlag } from '@/shared/lib/features'

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
		},
		initAuthData: (state) => {
			const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY)
			if (userData) {
				const userDataParsed = JSON.parse(userData) as User
				state.authData = userDataParsed
				// обновляю флаги фич
				setFeatureFlag(userDataParsed.features)
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