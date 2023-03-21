// import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
// import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider'
// import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetailsData'
// import { CommentType } from 'entities/Comment'
// import { getUserAuthData } from 'entities/User'
// import { getAddNewCommentText } from '../selectors/getAddNewComment'

// // createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// export const addNewComment = createAsyncThunk<
// 	CommentType,
// 	void,
// 	{
// 		rejectValue: string,
// 		state: StateSchema,
// 		extra: ThunkExtraArg
// 	}>(
// 		'addComment/addNewComment',
// 		async (_, thunkAPI) => {

// 			const { dispatch, extra, getState } = thunkAPI
// 			const commentText = getAddNewCommentText(getState())
// 			const userData = getUserAuthData(getState())
// 			const article = getArticleDetailsData(getState())
// 			if (!commentText || !userData || !article) {
// 				return thunkAPI.rejectWithValue('no data')
// 			}



// 			try {
// 				const response = await extra!.api!.post<CommentType>('/comments', {
// 					articleId: article.id,
// 					userId: userData.id,
// 					text: commentText
// 				})
// 				const responseData = response.data
// 				if (!responseData) {
// 					throw new Error()
// 				}

// 				return responseData

// 			} catch (err) {
// 				return thunkAPI.rejectWithValue('Some Error in addNewComment')
// 			}
// 		}
// 	)

// // createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения