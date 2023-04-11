import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article, ArticleListView, ArticleType } from 'entities/Article'
import { ArticleSortFieldType } from 'entities/Article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage'
import { SortOrderType } from 'shared/types/SortOrderType'
import { fetchArticleList } from '../services/fetchArticleList/fetchArticleList'
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
		ids: [],
		entities: {},

		limit: 3,
		page: 1,
		hasMore: true,

		_inited: false,

		view: 'grid',
		order: 'asc',
		sort: 'createdAt',
		search: '',
		type: 'ALL'
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleListView>) => {
			state.view = action.payload
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
		},

		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},

		setSort: (state, action: PayloadAction<ArticleSortFieldType>) => {
			state.sort = action.payload
		},

		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},

		setOrder: (state, action: PayloadAction<SortOrderType>) => {
			state.order = action.payload
		},

		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload
		},

		initState: (state) => {
			const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleListView
			state.view = view ?? 'grid'
			state.limit = view === 'grid' ? 8 : 3
			state._inited = true
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(
				fetchArticleList.pending,
				(state, action) => {
					state.error = undefined
					state.isLoading = true
					if (action.meta.arg.replace) {
						articlesAdapter.removeAll(state)
					}
				})
			.addCase(
				fetchArticleList.fulfilled,
				(state, action) => {
					state.isLoading = false
					state.hasMore = action.payload.length >= state.limit
					// Чтобы были поля meta.arg.replace, у fetchArticleList должно быть поле replace и action, который сюда прилетает нельзя типизировать как
					// PayloadAction<Article[]>. Все это нужно, чтобы при запросе можно было определить делаю ли я подгрузку(тогда addMany), либо я загружаю данные по новой, например при изменении сортировки
					if (action.meta.arg.replace) {
						articlesAdapter.setAll(state, action.payload)
					} else {
						articlesAdapter.addMany(state, action.payload)
					}
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
