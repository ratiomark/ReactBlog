import clsx from 'clsx';
import { Article, ArticleListView } from '@/entities/Article';
import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleListItemRedesigned } from '../ArticleListItemRedesigned/ArticleListItemRedesigned';
import { ArticleListItemSkeletonRedesigned } from '../ArticleListItemRedesigned/ArticleListItemSkeletonRedesigned';
import cls from './ArticleListUi.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/deprecated/Stack';


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
			<ArticleListItemSkeletonRedesigned
				view={view}
				key={index}
			/>
		))
)

export const ArticleListUiRedesigned = (props: ArticleListProps) => {
	const {
		className,
		view = 'list',
		error = '',
		isLoading = false,
		articles = [],
		target
	} = props

	const { t } = useTranslation()

	if (error) {
		return <p>ОШИБКА ОШИБКА ОШИБКА</p>
	}

	const renderArticle = (article: Article) => (
		<ArticleListItemRedesigned
			article={article}
			view={view}
			key={article.id}
			target={target}
		/>
	)

	if (view === 'grid') {
		return (
			<div className={cls.grid} >
				{articles.length > 0
					? articles.map(renderArticle)
					: null}
				{isLoading && getSkeletons(view)}
			</div>
		)
	}

	return (
		<>
			{articles.length > 0
				? articles.map(renderArticle)
				: null}
			{isLoading && getSkeletons(view)}
		</>
	);
}
// import clsx from 'clsx';
// import { Article, ArticleListView } from '@/entities/Article';
// import { HTMLAttributeAnchorTarget } from 'react';
// import { useTranslation } from 'react-i18next';
// import { ArticleListItemRedesigned } from '../ArticleListItemRedesigned/ArticleListItemRedesigned';
// import { ArticleListItemSkeletonRedesigned } from '../ArticleListItemRedesigned/ArticleListItemSkeletonRedesigned';
// import cls from './ArticleListUi.module.scss';
// import { ToggleFeatures } from '@/shared/lib/features';
// import { HStack } from '@/shared/ui/deprecated/Stack';


// interface ArticleListProps {
// 	className?: string
// 	articles?: Article[]
// 	error?: string
// 	view?: ArticleListView
// 	isLoading?: boolean
// 	target?: HTMLAttributeAnchorTarget
// }

// const getSkeletons = (view: ArticleListView) => (
// 	new Array(view === 'grid' ? 9 : 3)
// 		.fill(0)
// 		.map((item, index) => (
// 			<ArticleListItemSkeletonRedesigned
// 				view={view}
// 				key={index}
// 			/>
// 		))
// )

// export const ArticleListUiRedesigned = (props: ArticleListProps) => {
// 	const {
// 		className,
// 		view = 'list',
// 		error = '',
// 		isLoading = false,
// 		articles = [],
// 		target
// 	} = props

// 	const { t } = useTranslation()

// 	if (error) {
// 		return <p>ОШИБКА ОШИБКА ОШИБКА</p>
// 	}

// 	const renderArticle = (article: Article) => (
// 		<ArticleListItemRedesigned
// 			article={article}
// 			view={view}
// 			key={article.id}
// 			target={target}
// 		/>
// 	)

// 	return (
// 		<ToggleFeatures
// 			name='isAppRedesigned'
// 			off={
// 				<div className={clsx(
// 					cls[view],
// 					className)}
// 				>
// 					{articles.length > 0
// 						? articles.map(renderArticle)
// 						: null
// 					}
// 					{isLoading && <>
// 						{getSkeletons(view)}
// 					</>}
// 				</div>
// 			}
// 			on={
// 				<>
// 					{/* {false */}
// 					{articles.length > 0
// 						? articles.map(renderArticle)
// 						: null
// 					}
// 					{/* {true && <> */}
// 					{isLoading && getSkeletons(view)}
// 				</>
// 				// <article
// 				// 	className={clsx(
// 				// 		cls[view],
// 				// 		className)}
// 				// >
// 				// 	{/* {false */}
// 				// 	{articles.length > 0
// 				// 		? articles.map(renderArticle)
// 				// 		: null
// 				// 	}
// 				// 	{/* {true && <> */}
// 				// 	{isLoading && <>
// 				// 		{getSkeletons(view)}
// 				// 	</>}
// 				// </article>
// 			}
// 		/>
// 	);
// }