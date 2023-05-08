import clsx from 'clsx';
import { Article, ArticleListView } from '@/entities/Article';
import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleListUi.module.scss';


interface ArticleListProps {
	className?: string
	articles?: Article[]
	error?: string
	view?: ArticleListView
	isLoading?: boolean
	target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleListView) => (
	new Array(view === 'grid' ? 9 : 3)
		.fill(0)
		.map((item, index) => (
			<ArticleListItemSkeleton
				view={view}
				key={index}
			/>
		))
)

export const ArticleListUi = (props: ArticleListProps) => {
	const {
		className,
		view = 'list',
		error = '',
		isLoading = false,
		articles = [],
		target
	} = props

	const { t } = useTranslation()
	const renderArticle = (article: Article) => (
		<ArticleListItem
			article={article}
			view={view}
			key={article.id}
			target={target}
		/>
	)

	if (error) {
		return <p>ОШИБКА ОШИБКА ОШИБКА</p>
	}

	return (
		<div className={clsx(
			cls[view],
			[className])}
		>
			{articles.length > 0
				? articles.map(renderArticle)
				: null
			}
			{isLoading && <>
				{getSkeletons(view)}
			</>}
		</div>
	);
}