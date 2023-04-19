import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import {
	getArticlesPageHasMore,
	getArticleListArticlesPageIsLoading,
	getArticlesPageNum
} from '../../selectors/articleListArticlesPageSelectors'
import { articlesPageActions } from '../../slice/articlePageSlice'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchNextArticleListArticlesPage = createAsyncThunk<
	void,
	void,
	{ rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
		'articlePage/fetchNextArticleListArticlesPage',
		async (_, thunkAPI) => {
			const { dispatch, getState } = thunkAPI
			const hasMore = getArticlesPageHasMore(getState())
			const page = getArticlesPageNum(getState())
			const isLoading = getArticleListArticlesPageIsLoading(getState())

			if (hasMore && !isLoading) {
				const nextPage = page + 1
				dispatch(articlesPageActions.setPage(nextPage))
				dispatch(fetchArticleList({}))
				// debugger

			}
		}
	)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения