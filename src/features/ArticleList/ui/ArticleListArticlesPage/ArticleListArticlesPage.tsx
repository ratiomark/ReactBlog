import { getArticleListArticlesPageError, getArticleListArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articleListArticlesPageSelectors'
import { articlesPageReducer, getArticles } from '../../model/slice/articlePageSlice'
import { useSelector } from 'react-redux'
import { ArticleListUi } from '../ArticleListUi/ArticleListUi'
import { memo } from 'react'
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer'

// const reducers: ReducersList = {
// 	articlesPage: articlesPageReducer
// }
const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}
export const ArticleListArticlesPage = memo(() => {
	useAsyncReducer({ reducers, removeAfterUnmount: false })
	const articlesDetailsPage = useSelector(getArticles.selectAll)
	const errorDetailsPage = useSelector(getArticleListArticlesPageError)
	const isLoadingDetailsPage = useSelector(getArticleListArticlesPageIsLoading)
	const view = useSelector(getArticlesPageView) ?? 'list'
	return <ArticleListUi
		articles={articlesDetailsPage}
		error={errorDetailsPage}
		isLoading={isLoadingDetailsPage}
		view={view}
	/>
})
ArticleListArticlesPage.displayName = 'ArticleListArticlesPage'