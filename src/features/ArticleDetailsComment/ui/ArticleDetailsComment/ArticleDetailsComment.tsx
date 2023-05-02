import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewCommentError, useAddNewCommentText } from '../../model/selectors/getAddNewComment';
import { useAddNewCommentSliceActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { useTranslation } from 'react-i18next';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { AddNewComment, CommentList } from '@/entities/Comment';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { addNewCommentToArticle } from '../../model/services/addNewCommentToArticle';
import clsx from 'clsx';
import cls from './ArticleDetailsComment.module.scss';
import { Text } from '@/shared/ui/Text/Text';

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
	const commentText = useAddNewCommentText()
	const commentError = useAddNewCommentError()
	const { setCommentText } = useAddNewCommentSliceActions()
	const { dispatch } = useAsyncReducer({ reducers: reducers })
	const { t } = useTranslation()

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchCommentsByArticleId(id))
		}
		// eslint-disable-next-line
	}, [id])


	const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		setCommentText(event.target.value)
	}, [setCommentText])

	const onSendHandler = useCallback(() => {
		dispatch(addNewCommentToArticle())
	}, [dispatch])

	if (commentError) {
		return <p>{t('oshibka-oshibka-oshibka-v-kommentariyakh')}</p>
	}

	return (
		<div className={clsx(
			cls.addNewComment,
			[className])}
		>
			<Text title='Комментарии' className={cls.commentTitle} />
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
