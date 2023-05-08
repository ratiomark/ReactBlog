import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { fetchRecommendations } from '../services/fetchRecommendations'
import { ArticleDetailsRecommendationSchema } from '../types/articleDetailsRecommendationSchema'

const recommendationAdapter = createEntityAdapter<Article>({
	selectId: (comment) => comment.id
})


// создаю селектор для получения всех комментариев к статье
// TS будет ругаться, что в схеме articleDetailsCommentsScheme нет ids и entities, поэтому нужно добавить эту в схему
export const getArticleRecommendation = recommendationAdapter.getSelectors<StateSchema>(
	(state) => state.articleRecommendations || recommendationAdapter.getInitialState()
)

const articleDetailsRecommendationSlice = createSlice({
	name: 'articleDetailsRecommendationSlice',
	// нужно прокинуть ArticleDetailsRecommendationSchema, чтобы получить доспут к полям и объяснить ТС что мы будем использовать
	initialState: recommendationAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
		isLoading: false,
		error: undefined,
		entities: {},
		ids: [],
	}),
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchRecommendations.pending,
				(state) => {
					state.error = undefined
					state.isLoading = true
				})
			.addCase(
				fetchRecommendations.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.isLoading = false
					recommendationAdapter.setAll(state, action.payload)
				})
			.addCase(
				fetchRecommendations.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})
	}
})

export const { reducer: articleDetailsRecommendationReducer } = articleDetailsRecommendationSlice
export const { actions: articleDetailsRecommendationActions } = articleDetailsRecommendationSlice
