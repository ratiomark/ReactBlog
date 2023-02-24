import { createAsyncThunk, createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { User } from "entities/User/model/types/user";
import { loginUserByUserName } from "../services/loginByUserName/loginByUserName";
import { LoginSchema } from "../types/loginSchema";

const initialState: LoginSchema = {
	isLoading: false,
	username: '',
	password: ''
}


export const loginSlice = createSlice({
	name: "loginSlice",
	initialState: initialState,
	reducers: {
		setUserName: (state, action: PayloadAction<string>) => {
			state.username = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		}
	},
	extraReducers: (builer) => {
		builer
			.addCase(
				loginUserByUserName.pending,
				(state, action) => {
					state.error = undefined
					state.isLoading = true
				})
			.addCase(
				loginUserByUserName.fulfilled,
				(state, action) => {
					state.isLoading = false
					state.username = action.payload.username
				})
			.addCase(
				loginUserByUserName.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})

	}
})

export const { reducer: loginReducer } = loginSlice
export const { actions: loginActions } = loginSlice