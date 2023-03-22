import { Article, ArticleList } from 'entities/Article';
import { ArticleViewSwitcher } from 'features/ArticleViewSwitcher';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { useInitialEffect } from 'shared/lib/helpers/hooks/useInitialEffect';
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../model/selectors/articlesPageSelectors';
import { fetchArticleList } from '../model/services/fetchArticleList';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlePageSlice';


const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}

const ArticlesPage = memo(() => {
	const { t, i18n } = useTranslation()
	const { dispatch } = useAsyncReducer({ reducers })
	// за счет того, что я использую адаптер и в слайсе сделал селектор getArticles(в котором указал путь до сущностей), адаптер сам предоставляет методы для получения всех сущностей selectAll
	const articles = useSelector(getArticles.selectAll)
	const isLoading = useSelector(getArticlesPageIsLoading)
	const error = useSelector(getArticlesPageError)
	const view = useSelector(getArticlesPageView)

	const onChangeView = useCallback((view) => {
		dispatch(articlesPageActions.setView(view))
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(fetchArticleList())
		dispatch(articlesPageActions.initState())
	})


	if (error) {
		return <p>Какая-то ошибка в ArticlesPage компоненте при запросе</p>
	}

	return (
		<div>
			{/* {t('about')} */}
			<ArticleViewSwitcher
				view={view}
				onViewClick={onChangeView}
			/>
			<ArticleList
				view={view}
				isLoading={isLoading}
				articles={articles}
			/>
		</div>
	)
})
ArticlesPage.displayName = 'ArticlesPage'
export default ArticlesPage;