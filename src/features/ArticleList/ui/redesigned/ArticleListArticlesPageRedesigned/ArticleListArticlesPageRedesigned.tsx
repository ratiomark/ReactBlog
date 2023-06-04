import { getArticleListArticlesPageError, getArticleListArticlesPageIsLoading, getArticlesPageView } from '../../../model/selectors/articleListArticlesPageSelectors'
import { articlesPageReducer, getArticles } from '../../../model/slice/articlePageSlice'
import { useSelector } from 'react-redux'
import { ArticleListUiRedesigned } from '../ArticleListUiRedesigned/ArticleListUiRedesigned'
import { memo } from 'react'
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer'
import { ArticleListArticlesPage } from '../../deprecated/ArticleListArticlesPage/ArticleListArticlesPage'

// const reducers: ReducersList = {
// 	articlesPage: articlesPageReducer
// }
const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}
export const ArticleListArticlesPageRedesigned = memo(() => {
	useAsyncReducer({ reducers, removeAfterUnmount: false })

	const articlesDetailsPage = useSelector(getArticles.selectAll)
	const errorDetailsPage = useSelector(getArticleListArticlesPageError)
	const isLoadingDetailsPage = useSelector(getArticleListArticlesPageIsLoading)
	const view = useSelector(getArticlesPageView)
	return (
		<ArticleListUiRedesigned
			articles={articlesDetailsPage}
			error={errorDetailsPage}
			isLoading={isLoadingDetailsPage}
			view={view}
		/>
	)
})
ArticleListArticlesPage.displayName = 'ArticleListArticlesPage'