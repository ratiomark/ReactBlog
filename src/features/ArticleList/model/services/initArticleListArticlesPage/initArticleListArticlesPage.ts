import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { ArticleSortFieldType, ArticleType } from '@/entities/Article'
import { SortOrderType } from '@/shared/types/SortOrderType'
import { URLSearchParams } from 'url'
import { getArticlesPageInited } from '../../selectors/articleListArticlesPageSelectors'
import { articlesPageActions } from '../../slice/articlePageSlice'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const initArticleListArticlesPage = createAsyncThunk<
	void,
	URLSearchParams,
	{ extra: ThunkExtraArg, state: StateSchema }
>(
	'articlePage/initArticleListArticlesPage',
	async (searchParams, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		const _inited = getArticlesPageInited(getState())

		if (!_inited) {

			['sort', 'order', 'search', 'type'].forEach(filter => {
				const resultFromSearchParams = searchParams.get(filter)
				if (resultFromSearchParams) {
					switch (filter) {
						case 'sort':
							dispatch(articlesPageActions.setSort(resultFromSearchParams as ArticleSortFieldType))
							break;
						case 'order':
							dispatch(articlesPageActions.setOrder(resultFromSearchParams as SortOrderType))
							break
						case 'search':
							dispatch(articlesPageActions.setSearch(resultFromSearchParams))
							break
						case 'type':
							dispatch(articlesPageActions.setType(resultFromSearchParams as ArticleType))
					}
				}
			})

			dispatch(articlesPageActions.initState())
			dispatch(fetchArticleList({}))
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения