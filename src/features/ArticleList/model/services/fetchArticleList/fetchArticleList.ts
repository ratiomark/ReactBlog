import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { addQueryParams } from '@/shared/lib/helpers/url/addQueryParams/addQueryParams'
import { getArticlesPageLimit, getArticlesPageNum, getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType } from '../../selectors/articleListArticlesPageSelectors'



interface fetchArticleListProps {
	replace?: boolean
}

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchArticleList = createAsyncThunk<
	Article[],
	fetchArticleListProps,
	{ rejectValue: string, extra: ThunkExtraArg, state: StateSchema }
>(
	'articlePage/fetchArticleList',
	async (_, thunkAPI) => {
		const { getState } = thunkAPI
		const page = getArticlesPageNum(getState())
		const limit = getArticlesPageLimit(getState())
		const sort = getArticlesPageSort(getState())
		const order = getArticlesPageOrder(getState())
		const search = getArticlesPageSearch(getState())
		const type = getArticlesPageType(getState())
		try {
			addQueryParams({
				sort, order, search, type
			})
			const response = await thunkAPI.extra!.api!.get<Article[]>('/articles', {
				params: {
					_expand: 'user',
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					type: type === 'ALL' ? undefined : type,
					q: search
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