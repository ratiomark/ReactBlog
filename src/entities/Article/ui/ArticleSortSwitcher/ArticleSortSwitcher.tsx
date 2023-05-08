import clsx from 'clsx';
import { ArticleSortField, ArticleSortFieldType } from '../../model/types/article'
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SortOrderType } from '@/shared/types/SortOrderType';
import { Select, SelectOptions } from '@/shared/ui/Select/Select';
import cls from './ArticleSortSwitcher.module.scss';

interface ArticleSortSwitcherProps {
	className?: string
	sort: ArticleSortFieldType
	order: SortOrderType
	onOrderChange: (newOrder: SortOrderType) => void
	onSortChange: (newSort: ArticleSortFieldType) => void
}

export const ArticleSortSwitcher = (props: ArticleSortSwitcherProps) => {
	const {
		className,
		sort,
		order,
		onOrderChange,
		onSortChange,
		// onSearchChange,
		// searchValue,
	} = props

	const { t } = useTranslation('articles-page')

	// эти функции приходилось использовать тогда, когда не было дженерика
	// const onSortChangeHandle = useCallback((sort: ArticleSortFieldType) => {
	// 	 onSortChange(sort as ArticleSortFieldType)	
	// }, [onSortChange])

	// const onOrderChangeHandler = useCallback((order: string) => {
	// 	onOrderChange(order as SortOrderType)
	// }, [onOrderChange])

	const orderOptions = useMemo<SelectOptions<SortOrderType>[]>(() => ([
		{
			value: 'asc',
			content: t('ascending')
		},
		{
			value: 'desc',
			content: t('descending')
		}
	]), [t])

	const sortOptions = useMemo<SelectOptions<ArticleSortFieldType>[]>(() => ([
		{
			value: ArticleSortField.createdAt,
			content: t('date')
		},
		{
			value: ArticleSortField.title,
			content: t('title')
		},
		{
			value: ArticleSortField.views,
			content: t('views')
		},
	]), [t])


	return (
		<div className={clsx(
			cls.ArticleSortSwitcher,
			[className])}
		>
			<Select<ArticleSortFieldType>
				label={t('sort by')}
				options={sortOptions}
				value={sort}
				onChange={onSortChange}
			/>
			<Select<SortOrderType>
				label={t('by asc or desc')}
				options={orderOptions}
				value={order}
				onChange={onOrderChange}
			/>
		</div>
	)
}