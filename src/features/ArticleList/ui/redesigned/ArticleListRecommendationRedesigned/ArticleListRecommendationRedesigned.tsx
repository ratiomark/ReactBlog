import clsx from 'clsx';
import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import cls from './ArticleRecommendation.module.scss';
import { ArticleListUiRedesigned } from '../ArticleListUiRedesigned/ArticleListUiRedesigned';
import { useArticleRecommendationListQuery } from '../../../model/api/articleRecommendationsApi';
import { HStack, VStack} from '@/shared/ui/redesigned/Stack';
import { Heading } from '@/shared/ui/redesigned/Typography';

interface ArticleRecommendationProps {
	className?: string;
}

export const ArticleListRecommendationRedesigned = memo((props: ArticleRecommendationProps) => {
	const {
		className,
	} = props

	const { error, isLoading, data: articles } = useArticleRecommendationListQuery(4)

	return (
		<VStack as='section' align='start' gap='gap_16' className={clsx(cls.articleRecommendation, [className])}>
			<Heading bold title='Рекомендуем' />
			<HStack
				max
				gap='gap_16'
			>
				<ArticleListUiRedesigned
					articles={articles}
					isLoading={isLoading}
					error={error ? 'возникла ошибка при запросе статей' : undefined}
					view={'recommendations'}
					target='_blank'
				/>
			</HStack>
		</VStack>
	)
})

ArticleListRecommendationRedesigned.displayName = 'ArticleRecommendations'