import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article, ArticleListView } from 'entities/Article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage'
import { fetchArticleList } from '../services/fetchArticleList'
import { ArticlesPageSchema } from '../types/articlesPageSchema'


// в дженерик передаю тип сущности, которую буду нормализировать
const articlesAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id
})


// создаю селектор в котором описываю как добраться до стейта в котором хранятся сущности статей. Благодаря этому, позже я смогу вызвать useSelector(getArticles.[selectAll|selectById|selectIds|selectTotal]) - это магия entityAdapter
// TS будет ругаться, что в схеме articleDetailsCommentsScheme нет ids и entities, поэтому нужно добавить эту в схему
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	// нужно прокинуть схему стейта, чтобы ТС понимал с чем мы работаем
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		entities: {},
		ids: [],
		view: 'grid'
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleListView>) => {
			state.view = action.payload
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
		},
		initState: (state) => {
			state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleListView
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchArticleList.pending,
				(state) => {
					state.error = undefined
					state.isLoading = true
				})
			.addCase(
				fetchArticleList.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.isLoading = false
					articlesAdapter.setAll(state, action.payload)
				})
			.addCase(
				fetchArticleList.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})
	}
})

export const { reducer: articlesPageReducer } = articlesPageSlice
export const { actions: articlesPageActions } = articlesPageSlice
