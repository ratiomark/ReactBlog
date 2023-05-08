import clsx from 'clsx';
import { memo } from 'react';
import { ArticleListUi } from '@/features/ArticleList';
import { Text } from '@/shared/ui/Text/Text';
import cls from './ArticleRecommendations.module.scss'
import { useArticleRecommendationListQuery } from '../model/api/articleRecommendationsApi';

interface ArticleRecommendationProps {
	className?: string;
}

export const ArticleRecommendations = memo((props: ArticleRecommendationProps) => {
	const {
		className,
	} = props

	const { error, isLoading, data: articles } = useArticleRecommendationListQuery(4)

	return (
		<div className={clsx(cls.articleRecommendation, [className])}>
			<Text title='Рекомендуем' />
			<ArticleListUi
				articles={articles}
				isLoading={isLoading}
				error={error ? 'возникла ошибка при запросе статей' : undefined}
				view={'recommendations'}
				target='_blank'
			/>
		</div>
	)
})

ArticleRecommendations.displayName = 'ArticleRecommendations'