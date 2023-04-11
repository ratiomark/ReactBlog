import clsx from 'clsx';
import { getArticlesPageView } from 'features/ArticleList';
import { fetchArticleList } from 'features/ArticleList';
import { articlesPageActions } from 'features/ArticleList';
import { ArticleViewSwitcher } from 'features/ArticleViewSwitcher';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch';
import cls from './ArticlesPageSearchPanel.module.scss';

interface ArticlesPageSearchPanelProps {
	className?: string
}

export const ArticlesPageViewPanel = memo((props: ArticlesPageSearchPanelProps) => {
	const {
		className
	} = props

	const dispatch = useAppDispatch()

	const view = useSelector(getArticlesPageView)
	const fetchArticles = useCallback(() => {
		dispatch(fetchArticleList({ replace: true }))
	}, [dispatch])

	const onChangeView = useCallback((view) => {
		dispatch(articlesPageActions.setView(view))
		// dispatch(articlesPageActions.setPage(1))
		// fetchArticles()
	}, [dispatch])



	return (
		<ArticleViewSwitcher
			view={view}
			onViewClick={onChangeView}

		/>
	)
})
ArticlesPageViewPanel.displayName = 'ViewPanel'