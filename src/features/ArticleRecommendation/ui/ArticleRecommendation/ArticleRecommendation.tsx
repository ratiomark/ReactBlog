import clsx from 'clsx';
import cls from './ArticleRecommendation.module.scss'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getArticleRecommendationIsLoading, getArticleRecommendationError } from '../../model/selectors/articleDetailsRecommendationSelectors';
import { articleDetailsRecommendationReducer, getArticleRecommendation } from '../../model/slice/articleDetailsRecommendationSlice';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { useInitialEffect } from '@/shared/lib/helpers/hooks/useInitialEffect';
import { fetchRecommendations } from '../../model/services/fetchRecommendations';
import { ArticleListUi } from '@/features/ArticleList/ui/ArticleListUi/ArticleListUi';
import { Text } from '@/shared/ui/Text/Text';

interface ArticleRecommendationProps {
	className?: string;

}
const reducers: ReducersList = {
	articleRecommendations: articleDetailsRecommendationReducer,
}

export const ArticleRecommendation = memo((props: ArticleRecommendationProps) => {
	const {
		className,
	} = props
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: true })
	const isLoading = useSelector(getArticleRecommendationIsLoading)
	const error = useSelector(getArticleRecommendationError)
	const articles = useSelector(getArticleRecommendation.selectAll)

	useInitialEffect(() => {
		dispatch(fetchRecommendations())
	})

	return (
		<div className={clsx(cls.articleRecommendation, [className])}>
			<Text title='Рекомендуем' />
			<ArticleListUi
				articles={articles}
				isLoading={isLoading}
				error={error}
				view={'recommendations'}
				target='_blank'
			/>
		</div>
	)
})

ArticleRecommendation.displayName = 'ArticleRecommendation'