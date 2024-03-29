import { useSelector } from 'react-redux';
import { memo, ReactNode, useCallback } from 'react';
import {
	getArticleListArticlesPageIsLoading,
	initArticleListArticlesPage,
	fetchNextArticleListArticlesPage,
} from '@/features/ArticleList'
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/helpers/hooks/useInitialEffect';
import { Page } from '@/widgets/Page';
import cls from './ArticlesPageWrapper.module.scss'
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticlesPageWrapperProps {
	children: ReactNode
}

export const ArticlesPageWrapper = memo((props: ArticlesPageWrapperProps) => {
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getArticleListArticlesPageIsLoading)
	const [searchParams] = useSearchParams()

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticleListArticlesPage())
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(initArticleListArticlesPage(searchParams))
	})

	return (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<Page
					className={cls.ArticlesPageWrapper}
					onScrollEnd={onLoadNextPart}
					isLoading={isLoading}
				>
					{props.children}
				</Page>
			}
			on={
				<Page
					className={cls.ArticlesPageWrapperRedesigned}
					onScrollEnd={onLoadNextPart}
					isLoading={isLoading}
				>
					{props.children}
				</Page>
			}
		/>
	)
})
ArticlesPageWrapper.displayName = 'ArticlesPageWrapper'