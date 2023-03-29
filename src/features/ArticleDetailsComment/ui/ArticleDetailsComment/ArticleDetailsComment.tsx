import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAddNewCommentError, getAddNewCommentText } from '../../model/selectors/getAddNewComment';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { useTranslation } from 'react-i18next';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { AddNewComment, CommentList } from 'entities/Comment';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { addNewCommentToArticle } from '../../model/services/addNewCommentToArticle';
import clsx from 'clsx';
import cls from './ArticleDetailsComment.module.scss';

interface ArticleDetailsCommentProps {
	className?: string
	id: string
}

const reducers: ReducersList = {
	addNewComment: addNewCommentReducer,
	articleDetailsComments: articleDetailsCommentsReducer
}

export const ArticleDetailsComment = memo((props: ArticleDetailsCommentProps) => {
	const {
		className,
		id,
	} = props

	const comments = useSelector(getArticleComments.selectAll)
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
	const commentText = useSelector(getAddNewCommentText)
	const commentError = useSelector(getAddNewCommentError)
	const { dispatch } = useAsyncReducer({ reducers: reducers })
	const { t } = useTranslation()

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchCommentsByArticleId(id))
		}
		// eslint-disable-next-line
	}, [id])


	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(addNewCommentActions.setCommentText(event.target.value))
	}, [dispatch])

	const onSendHandler = useCallback(() => {
		dispatch(addNewCommentToArticle())
	}, [dispatch])

	if (commentError) {
		return <p>ошибка ошибка ошибка В комментариях</p>
	}

	return (
		<div className={clsx(
			cls.addNewComment,
			[className])}
		>
			<AddNewComment
				text={commentText}
				onChange={onChange}
				onSendNewComment={onSendHandler}
			/>
			<CommentList
				isLoading={commentsIsLoading}
				comments={comments.reverse()} />
		</div>
	);
})
ArticleDetailsComment.displayName = 'ArticleDetailsCommentBlock'