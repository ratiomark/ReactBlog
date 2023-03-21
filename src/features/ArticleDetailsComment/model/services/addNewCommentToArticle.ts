import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider'
import { getArticleDetailsData } from 'entities/Article'
import { CommentType } from 'entities/Comment'
import { getUserAuthData } from 'entities/User'
import { getAddNewCommentText } from '../selectors/getAddNewComment'
import { addNewCommentActions } from '../slice/addNewCommentSlice'
import { articleDetailsCommentsActions } from '../slice/articleDetailsCommentsSlice'
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const addNewCommentToArticle = createAsyncThunk<CommentType, void, { rejectValue: string, state: StateSchema, extra: ThunkExtraArg }>(
	'addComment/addNewComment',
	async (_, thunkAPI) => {

		const { dispatch, rejectWithValue, extra, getState } = thunkAPI

		const commentText = getAddNewCommentText(getState())
		const userData = getUserAuthData(getState())
		const article = getArticleDetailsData(getState())

		if (!commentText || !userData || !article) {
			return rejectWithValue('no data')
		}



		try {
			const response = await extra!.api!.post<CommentType>('/comments', {
				articleId: article.id,
				userId: userData.id,
				text: commentText
			})
			const responseData = response.data
			if (!responseData) {
				throw new Error()
			}
			
			const newComment: CommentType = {
				id: responseData.id,
				user: userData,
				text: commentText,
				avatar: userData.avatar
			}
			// при таком способе не работает отображение аватара
			// dispatch(articleDetailsCommentsActions.addComment(newComment))
			dispatch(fetchCommentsByArticleId(article.id))
			dispatch(addNewCommentActions.setCommentText(''))
			return responseData

		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in addNewComment')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения