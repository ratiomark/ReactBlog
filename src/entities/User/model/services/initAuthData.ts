import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { USER_ID_LS_KEY } from '@/shared/const/localStorage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserDataByIdQuery } from '../api/userApi'
import { User } from '../types/user'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const initAuthData = createAsyncThunk<User, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/initAuthData',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		const userId = localStorage.getItem(USER_ID_LS_KEY)

		if (!userId) return rejectWithValue('Нет userId в локал сторедж')

		try {
			const response = await dispatch(getUserDataByIdQuery(userId)).unwrap() //разворачиваю в реальный результат

			return response

		} catch (err) {
			return rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения