import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { CommentType } from '@/entities/Comment'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId'
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'

const commentsAdapter = createEntityAdapter<CommentType>({
	selectId: (comment) => comment.id
})


// создаю селектор для получения всех комментариев к статье
// TS будет ругаться, что в схеме articleDetailsCommentsScheme нет ids и entities, поэтому нужно добавить эту в схему
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsComments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	// нужно прокинуть articleDetailsCommentsScheme, чтобы
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
		isLoading: false,
		error: undefined,
		entities: {},
		ids: [],
	}),
	reducers: {
		addComment: (state, action: PayloadAction<CommentType>) => {
			commentsAdapter.setOne(state, action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCommentsByArticleId.pending,
				(state) => {
					state.error = undefined
					state.isLoading = true
				})
			.addCase(
				fetchCommentsByArticleId.fulfilled,
				(state, action: PayloadAction<CommentType[]>) => {
					state.isLoading = false
					commentsAdapter.setAll(state, action.payload)
				})
			.addCase(
				fetchCommentsByArticleId.rejected,
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				})
	}
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice
