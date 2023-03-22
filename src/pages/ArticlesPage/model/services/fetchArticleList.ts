import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchArticleList = createAsyncThunk<Article[], void, { rejectValue: string, extra: ThunkExtraArg }>(
	'articlePage/fetchArticleList',
	async (_, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI

		try {
			const response = await thunkAPI.extra!.api!.get<Article[]>('/articles', {
				params: {
					_expand: 'user'
				}
			})
			const responseData = response.data
			if (!responseData) {
				throw new Error()
			}

			return responseData

		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in fetchArticleList')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения