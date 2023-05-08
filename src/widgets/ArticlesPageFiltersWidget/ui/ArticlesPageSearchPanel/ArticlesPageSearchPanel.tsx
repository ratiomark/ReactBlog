import clsx from 'clsx';
import { fetchArticleList, articlesPageActions, getArticlesPageSearch } from '@/features/ArticleList';
import { SearchPanel } from '@/features/SearchPanel';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/helpers/hooks/useDebounce';
import cls from './ArticlesPageSearchPanel.module.scss';

interface ArticlesPageSearchPanelProps {
	className?: string
}

export const ArticlesPageSearchPanel = (props: ArticlesPageSearchPanelProps) => {
	const {
		className
	} = props

	const dispatch = useAppDispatch()
	const fetchArticles = useCallback(() => {
		dispatch(fetchArticleList({ replace: true }))
	}, [dispatch])

	const debounceFetchArticles = useDebounce(fetchArticles)

	const onSearchChange = useCallback((value: string) => {
		dispatch(articlesPageActions.setSearch(value))
		dispatch(articlesPageActions.setPage(1))
		debounceFetchArticles()
	}, [dispatch, debounceFetchArticles])

	const search = useSelector(getArticlesPageSearch)
	const { t } = useTranslation()

	return (
		<SearchPanel
			className={className}
			searchValue={search}
			onChangeSearchValue={onSearchChange}
			placeholder={t('search placehoder')}
		/>
	)
}