import clsx from 'clsx';
import { ArticleSortFieldType, ArticleSortSwitcher } from '@/entities/Article';
import { getArticlesPageOrder, getArticlesPageSort } from '@/features/ArticleList';
import { fetchArticleList } from '@/features/ArticleList';
import { articlesPageActions } from '@/features/ArticleList';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { SortOrderType } from '@/shared/types/SortOrderType';

interface ArticlesPageSearchPanelProps {
	className?: string
}

export const ArticlesPageSortPanel = memo((props: ArticlesPageSearchPanelProps) => {
	const {
		className
	} = props

	const dispatch = useAppDispatch()
	const sort = useSelector(getArticlesPageSort)
	const order = useSelector(getArticlesPageOrder)

	const fetchArticles = useCallback(() => {
		dispatch(fetchArticleList({ replace: true }))
	}, [dispatch])

	const onSortChange = useCallback((newSort: ArticleSortFieldType) => {
		dispatch(articlesPageActions.setSort(newSort))
		dispatch(articlesPageActions.setPage(1))
		fetchArticles()
	}, [dispatch, fetchArticles])

	const onOrderChange = useCallback((newOrder: SortOrderType) => {
		dispatch(articlesPageActions.setOrder(newOrder))
		dispatch(articlesPageActions.setPage(1))
		fetchArticles()
	}, [dispatch, fetchArticles])
	return (
		<ArticleSortSwitcher
			sort={sort}
			onSortChange={onSortChange}
			order={order}
			onOrderChange={onOrderChange}
		/>
	)
})
ArticlesPageSortPanel.displayName = 'SortPanel'
