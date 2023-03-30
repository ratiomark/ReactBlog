import clsx from 'clsx';
import { Article, ArticleListView } from '../../model/types/article';
import { useTranslation } from 'react-i18next';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
	className?: string
	articles?: Article[]
	view?: ArticleListView
	isLoading?: boolean
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

export const ArticleList = (props: ArticleListProps) => {
	const {
		className,
		view = 'list',
		isLoading,
		articles = []
	} = props

	const { t } = useTranslation()
	const renderArticle = (article: Article) => (
		<ArticleListItem
			article={article}
			view={view}
			key={article.id}
		/>
	)

	// if (isLoading) {
	// 	return <div className={clsx(
	// 		// cls.ArticleList,
	// 		cls[view],
	// 		[className])}
	// 	>
	// 		{getSkeletons(view)}
	// 	</div>
	// }

	return (
		<div className={clsx(
			// cls.ArticleList,
			cls[view],
			[className])}
		>
			{articles.length > 0
				? articles.map(renderArticle)
				: null
			}
			{isLoading && <div className={clsx(
				// cls.ArticleList,
				cls[view],
				[className])}
			>
				{getSkeletons(view)}
			</div>}
		</div>
	);
}