import { ArticleDetails } from '@/entities/Article';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetailsComment, ArticleDetailsCommentRedesigned } from '@/features/ArticleDetailsComment';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsRedesigned } from '@/entities/Article';
import { ArticleListRecommendationRedesigned } from '@/features/ArticleList';
import { StickyContentLayout } from '@/shared/layouts';
import { Card } from '@/shared/ui/redesigned/Card/Card';

const ArticleDetailsPage = memo(() => {
	const { t, i18n } = useTranslation('article-details')
	const { id } = useParams<{ id: string }>()

	if (!id) {
		return <div>{t('article not found')}</div>
	}

	const articleRating = toggleFeatures({
		name: 'isArticleRatingEnabled',
		on: () => 'Значение при активированной фиче',
		off: () => 'Значение при выключенной фиче'
	})

	return (
		<ToggleFeatures
			name="isAppRedesigned"
			off={
				<>
					<ArticleDetails id={id} />
					<ArticleRecommendations />
					<div>Заглушка для пользователей у которых не активирована фича</div>
					{articleRating}
					<ArticleDetailsComment id={id} />
				</>
			}
			on={
				<StickyContentLayout
					content={
						<Card padding='24'>
							<ArticleDetailsRedesigned id={id} />
							{/* <ArticleRating articleId={id} /> */}
							<ArticleListRecommendationRedesigned />
							<ArticleDetailsCommentRedesigned id={id} />
						</Card>
					}
				/>
			}
		/>
	)
})

ArticleDetailsPage.displayName = 'ArticleDetailsPage'
export default ArticleDetailsPage;