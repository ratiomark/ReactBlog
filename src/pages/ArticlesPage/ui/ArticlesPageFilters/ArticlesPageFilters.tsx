import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { ArticleSortFieldType, ArticleType, ArticleSortSwitcher } from 'entities/Article';
import { ArticleViewSwitcher } from 'features/ArticleViewSwitcher';
import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../model/slice/articlePageSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch';
import { useDebounce } from 'shared/lib/helpers/hooks/useDebounce';
import { SortOrderType } from 'shared/types/SortOrderType';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
	className?: string
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const view = useSelector(getArticlesPageView)
	const sort = useSelector(getArticlesPageSort)
	const order = useSelector(getArticlesPageOrder)
	const search = useSelector(getArticlesPageSearch)
	const type = useSelector(getArticlesPageType)

	const fetchArticles = useCallback(() => {
		dispatch(fetchArticleList({ replace: true }))
	}, [dispatch])

	const debounceFetchArticles = useDebounce(fetchArticles)

	const onChangeView = useCallback((view) => {
		dispatch(articlesPageActions.setView(view))
		fetchArticles()
	}, [dispatch, fetchArticles])

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

	const onSearchChange = useCallback((value: string) => {
		dispatch(articlesPageActions.setSearch(value))
		dispatch(articlesPageActions.setPage(1))
		debounceFetchArticles()
	}, [dispatch, debounceFetchArticles])

	const onTypeChange = useCallback((tab: TabItem) => {
		dispatch(articlesPageActions.setType(tab.value as ArticleType))
		dispatch(articlesPageActions.setPage(1))
		fetchArticles()
	}, [dispatch, fetchArticles])

	const typeTabs = useMemo<TabItem[]>(() => [
		{
			value: 'ALL',
			content: 'all'
		},
		{
			value: 'IT',
			content: 'IT'
		},
		{
			value: 'ECONOMICS',
			content: 'economics'
		},
		{
			value: 'SCIENCE',
			content: 'science'
		},
	], [])

	return (
		<div className={clsx(
			cls.ArticlesPageFilters,
			[className])}
		>
			<div className={cls.sortWrapper}>
				{/* <Select label={t('sort by')} /> */}
				<ArticleSortSwitcher
					sort={sort}
					order={order}
					onSortChange={onSortChange}
					onOrderChange={onOrderChange}
				// onSearchChange={onSearchChange}
				// searchValue={search}
				/>
				<ArticleViewSwitcher view={view} onViewClick={onChangeView} />
			</div>
			<Card className={cls.search} >
				<Input
					value={search}
					onChangeString={onSearchChange}
					placeholder={t('search placehoder')}
				/>
			</Card>
			<Tabs
				tabs={typeTabs}
				value={type}
				onTabClick={onTypeChange}
				className={cls.tabs}
			/>
		</div>
	)
}