import { useSelector } from 'react-redux';
import { memo } from 'react';
import {
	ArticleListArticlesPage,
	getArticleListArticlesPageError,
} from '@/features/ArticleList'
import { ArticlesPageFiltersWidget } from '@/widgets/ArticlesPageFiltersWidget';
import { ArticlesPageWrapper } from '../ArticlesPageWrapper/ArticlesPageWrapper';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticlesPageFiltersWidgetRedesigned } from '@/widgets/ArticlesPageFiltersWidgetRedesigned';
import { ArticlesPageViewPanel } from '@/widgets/ArticlesPageFiltersWidgetRedesigned';
import { StickyContentLayout } from '@/shared/layouts';
import { ArticleListArticlesPageRedesigned } from '@/features/ArticleList';

const ArticlesPage = memo(() => {
	const error = useSelector(getArticleListArticlesPageError)

	if (error) return <p>Какая-то ошибка в ArticlesPage при запросе</p>

	return (

		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<ArticlesPageWrapper>
					<ArticlesPageFiltersWidget />
					<ArticleListArticlesPage />
				</ArticlesPageWrapper>
			}

			on={
				<StickyContentLayout
					left={<ArticlesPageViewPanel />}
					content={
						<ArticlesPageWrapper>
							<ArticleListArticlesPageRedesigned />
						</ArticlesPageWrapper>
					}
					right={<ArticlesPageFiltersWidgetRedesigned />}
				/>

				// {/* <ArticleListArticlesPage /> */}
				// {/* <ArticlesPageViewPanel /> */}
				// <ArticlesPageWrapper>
				// 	<StickyContentLayout
				// 		left={<ArticlesPageViewPanel />}
				// 		content={<ArticleListArticlesPage />}
				// 		right={<ArticlesPageFiltersWidgetRedesigned />}
				// 	/>

				// 	{/* <ArticleListArticlesPage /> */}
				// 	{/* <ArticlesPageViewPanel /> */}
				// </ArticlesPageWrapper>
			}
		/>
	)
})

ArticlesPage.displayName = 'ArticlesPage'
export default ArticlesPage;

// import { useSelector } from 'react-redux';
// import { memo, useCallback } from 'react';
// import {
// 	ArticleListArticlesPage,
// 	getArticleListArticlesPageError,
// 	getArticleListArticlesPageIsLoading,
// 	initArticleListArticlesPage,
// 	fetchNextArticleListArticlesPage,
// } from 'features/ArticleList'
// import { useSearchParams } from 'react-router-dom';
// import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch';
// import { useInitialEffect } from 'shared/lib/helpers/hooks/useInitialEffect';
// import { Page } from 'widgets/Page/Page';
// import cls from './ArticlesPage.module.scss'
// import { ArticlesPageFiltersWidget } from 'widgets/ArticlesPageFiltersWidget';

// const ArticlesPage = memo(() => {
// 	const dispatch = useAppDispatch()
// 	const error = useSelector(getArticleListArticlesPageError)
// 	const isLoading = useSelector(getArticleListArticlesPageIsLoading)
// 	const [searchParams] = useSearchParams()

// 	const onLoadNextPart = useCallback(() => {
// 		dispatch(fetchNextArticleListArticlesPage())
// 	}, [dispatch])

// 	useInitialEffect(() => {
// 		dispatch(initArticleListArticlesPage(searchParams))
// 	})


// 	if (error) {
// 		return <p>Какая-то ошибка в ArticlesPage при запросе</p>
// 	}

// 	return (
// 		<Page
// 			className={cls.page}
// 			onScrollEnd={onLoadNextPart}
// 			isLoading={isLoading}
// 		>
// 			<ArticlesPageFiltersWidget />
// 			<ArticleListArticlesPage />
// 		</Page>
// 	)
// })
// ArticlesPage.displayName = 'ArticlesPage'
// export default ArticlesPage;