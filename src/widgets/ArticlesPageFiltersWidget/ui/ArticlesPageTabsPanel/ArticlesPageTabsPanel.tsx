import clsx from 'clsx';
import { ArticleTabs, ArticleType } from '@/entities/Article';
import {
	getArticlesPageType,
	fetchArticleList,
	articlesPageActions
} from '@/features/ArticleList';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { TabItem } from '@/shared/ui/deprecated/Tabs/Tabs';


interface ArticlesPageSearchPanelProps {
	className?: string
}

export const ArticlesPageTabsPanel = memo((props: ArticlesPageSearchPanelProps) => {
	const {
		className
	} = props

	const dispatch = useAppDispatch()
	const type = useSelector(getArticlesPageType)
	const fetchArticles = useCallback(() => {
		dispatch(fetchArticleList({ replace: true }))
	}, [dispatch])
	const onTypeChange = useCallback((tab: TabItem) => {
		dispatch(articlesPageActions.setType(tab.value as ArticleType))
		dispatch(articlesPageActions.setPage(1))
		fetchArticles()
	}, [dispatch, fetchArticles])

	return (
		<ArticleTabs
			value={type}
			onArticleTabClick={onTypeChange}
			className={className}
		/>
	)
})
ArticlesPageTabsPanel.displayName = 'TabsPanel'




