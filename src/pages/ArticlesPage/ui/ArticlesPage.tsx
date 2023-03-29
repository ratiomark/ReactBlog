import { Article, ArticleList } from 'entities/Article';
import { ArticleViewSwitcher } from 'features/ArticleViewSwitcher';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { useInitialEffect } from 'shared/lib/helpers/hooks/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { getArticlesPageError, getArticlesPageHasMore, getArticlesPageInited, getArticlesPageIsLoading, getArticlesPageNum, getArticlesPageView } from '../model/selectors/articlesPageSelectors';
import { fetchArticleList } from '../model/services/fetchArticleList/fetchArticleList';
import { fetchNextArticlePage } from '../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlePageSlice';
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
	const onChangeView = useCallback((view) => {
		dispatch(articlesPageActions.setView(view))
	}, [dispatch])

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlePage())
		console.log('---------------------------')
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(initArticlesPage())
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
			<ArticleViewSwitcher
				view={view}
				onViewClick={onChangeView}
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