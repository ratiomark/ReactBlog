// import clsx from 'clsx';
// import { Article, ArticleListView } from '../../model/types/article';
// import { useTranslation } from 'react-i18next';
// import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
// import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
// import cls from './ArticleList.module.scss';
// import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
// import { getArticles } from 'pages/ArticlesPage/model/slice/articlePageSlice';
// import { useSelector } from 'react-redux';

// interface ArticleListProps {
// 	className?: string
// 	articlesFromProps?: Article[]
// 	error?: string
// 	view?: ArticleListView
// 	isLoading?: boolean
// }

// const getSkeletons = (view: ArticleListView) => (
// 	new Array(view === 'grid' ? 9 : 3)
// 		.fill(0)
// 		.map((item, index) => (
// 			<ArticleListItemSkeleton
// 				view={view}
// 				key={index}
// 			/>
// 		))
// )

// export const ArticleList = (props: ArticleListProps) => {
// 	const {
// 		className,
// 		// view = 'list',
// 		error = '',
// 		isLoading = false,
// 		articlesFromProps = []
// 	} = props
// 	const articlesDetailsPage = useSelector(getArticles.selectAll)
// 	const errorDetailsPage = useSelector(getArticlesPageError)
// 	const isLoadingOnDetailsPage = useSelector(getArticlesPageIsLoading)
// 	const view = useSelector(getArticlesPageView) ?? 'list'
// 	const { t } = useTranslation()
// 	const renderArticle = (article: Article) => (
// 		<ArticleListItem
// 			article={article}
// 			view={view}
// 			key={article.id}
// 		/>
// 	)
// 	const content = articlesFromProps.length > 0 ? articlesFromProps : articlesDetailsPage
// 	const loadingStatus = isLoading ? isLoading : isLoadingOnDetailsPage
// 	const errorStatus = error ? error : errorDetailsPage


// 	return (
// 		<div className={clsx(
// 			// cls.ArticleList,
// 			cls[view],
// 			[className])}
// 		>
// 			{content.length > 0
// 				? content.map(renderArticle)
// 				: null
// 			}
// 			{loadingStatus && <div className={clsx(
// 				// cls.ArticleList,
// 				cls[view],
// 				[className])}
// 			>
// 				{getSkeletons(view)}
// 			</div>}
// 		</div>
// 	);
// }