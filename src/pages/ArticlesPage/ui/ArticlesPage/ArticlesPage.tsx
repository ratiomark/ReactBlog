import { ArticleList } from 'entities/Article';
import { getArticlesPageIsLoading, getArticlesPageError, getArticlesPageInited, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { fetchNextArticlePage } from 'pages/ArticlesPage/model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer, getArticles } from 'pages/ArticlesPage/model/slice/articlePageSlice';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { useInitialEffect } from 'shared/lib/helpers/hooks/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss'

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}

const ArticlesPage = memo(() => {
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	// за счет того, что я использую адаптер и в слайсе сделал селектор getArticles(в котором указал путь до сущностей), адаптер сам предоставляет методы для получения всех сущностей selectAll
	const articles = useSelector(getArticles.selectAll)
	const isLoading = useSelector(getArticlesPageIsLoading)
	const error = useSelector(getArticlesPageError)
	const view = useSelector(getArticlesPageView)
	const _inited = useSelector(getArticlesPageInited)
	const [searchParams] = useSearchParams()
	// const onChangeView = useCallback((view) => {
	// 	dispatch(articlesPageActions.setView(view))
	// }, [dispatch])

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlePage())
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams))
	})


	if (error) {
		return <p>Какая-то ошибка в ArticlesPage компоненте при запросе</p>
	}

	return (
		<Page
			className={cls.page}
			onScrollEnd={onLoadNextPart}
			isLoading={isLoading}
		>
			<ArticlesPageFilters

			/>
			<ArticleList
				view={view}
				isLoading={isLoading}
				articles={articles}
			/>
		</Page>
	)
})
export default ArticlesPage;