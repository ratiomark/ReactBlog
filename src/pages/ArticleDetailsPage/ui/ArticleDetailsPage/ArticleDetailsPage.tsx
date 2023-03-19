import { ArticleDetails } from 'entities/Article';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { useSelector } from 'react-redux';
import { CommentList } from 'entities/Comment';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = memo(() => {
	const { t, i18n } = useTranslation('article-details')
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: true })

	// типизирую хук, указаывая что у объекта единственное поле id типа стринг
	const { id } = useParams<{ id: string }>()

	const comments = useSelector(getArticleComments.selectAll)
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchCommentsByArticleId(id))
		}
		// eslint-disable-next-line
	}, [])

	if (!id) {
		return <div>{t('article not found')}</div>
	}

	return (
		<div>
			<span>{t('ARTICLES')}</span>
			<ArticleDetails id={id} />
			<CommentList
				isLoading={commentsIsLoading}
				comments={comments} />
		</div>
	)
})

ArticleDetailsPage.displayName = 'ArticleDetailsPage'
export default ArticleDetailsPage;