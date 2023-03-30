import clsx from 'clsx';
import { ArticleSortField, ArticleSortFieldType } from 'entities/Article';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SortOrderType } from 'shared/types/SortOrderType';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import cls from './ArticleSortSwitcher.module.scss';

interface ArticleSortSwitcherProps {
	className?: string
	sort: ArticleSortFieldType
	order: SortOrderType
	// searchValue: string
	onOrderChange: (newOrder: SortOrderType) => void
	onSortChange: (newSort: ArticleSortFieldType) => void
	// onSearchChange: (searchValue: string) => void
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
	const onSortChangeHandle = useCallback((sort: string) => {
		onSortChange(sort as ArticleSortFieldType)
	}, [onSortChange])

	const onOrderChangeHandler = useCallback((order: string) => {
		onOrderChange(order as SortOrderType)
	}, [onOrderChange])

	const orderOptions = useMemo<SelectOptions[]>(() => ([
		{
			value: 'asc',
			content: t('ascending')
		},
		{
			value: 'desc',
			content: t('descending')
		}
	]), [t])

	const sortOptions = useMemo<SelectOptions[]>(() => ([
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
			<Select
				label={t('sort by')}
				options={sortOptions}
				value={sort}
				onChange={onSortChangeHandle}
			/>
			<Select
				label={t('by asc or desc')}
				options={orderOptions}
				value={order}
				onChange={onOrderChangeHandler}
			/>
			{/* <Card className={cls.search} >
				<Input placeholder={t('search placehoder')} />
			</Card> */}
		</div>
	)
}