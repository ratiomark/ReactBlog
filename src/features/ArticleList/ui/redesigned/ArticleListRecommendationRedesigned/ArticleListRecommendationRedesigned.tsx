import clsx from 'clsx';
import cls from './ArticleRecommendation.module.scss'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleListUiRedesigned } from '../ArticleListUiRedesigned/ArticleListUiRedesigned';
import { fetchRecommendations } from '../../../model/services/fetchRecommendations/fetchRecommendations';
import { articleDetailsRecommendationReducer, getArticleRecommendation } from '../../../model/slice/articleDetailsRecommendationSlice';
import { getArticleRecommendationIsLoading, getArticleRecommendationError } from '../../../model/selectors/articleListRecommendationSelectors';
import { useInitialEffect } from '@/shared/lib/helpers/hooks/useInitialEffect';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';

interface ArticleRecommendationProps {
	className?: string;
}

const reducers: ReducersList = {
	articleRecommendations: articleDetailsRecommendationReducer,
}

export const ArticleListRecommendationRedesigned = memo((props: ArticleRecommendationProps) => {
	const {
		className,
	} = props
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: true })
	const isLoadingRecommendation = useSelector(getArticleRecommendationIsLoading)
	const errorRecommendation = useSelector(getArticleRecommendationError)
	const articlesRecommendation = useSelector(getArticleRecommendation.selectAll)

	useInitialEffect(() => {
		dispatch(fetchRecommendations())
	})

	return (
		<div className={clsx(cls.articleRecommendation, [className])}>
			<ArticleListUiRedesigned
				isLoading={isLoadingRecommendation}
				error={errorRecommendation}
				articles={articlesRecommendation}
				view={'list'}
				target='_blank'
			/>
		</ div >
	)
})

ArticleListRecommendationRedesigned.displayName = 'ArticleListRecommendationRedesigned'
