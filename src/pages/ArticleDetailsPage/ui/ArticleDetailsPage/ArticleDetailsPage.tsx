import { ArticleDetails } from '@/entities/Article';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetailsComment } from '@/features/ArticleDetailsComment';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';


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
		<>
			<ArticleDetails id={id} />
			<ArticleRecommendations />
			<div>Заглушка для пользователей у которых не активирована фича</div>
			{articleRating}
			<ArticleDetailsComment id={id} />
		</>
	)
})

ArticleDetailsPage.displayName = 'ArticleDetailsPage'
export default ArticleDetailsPage;