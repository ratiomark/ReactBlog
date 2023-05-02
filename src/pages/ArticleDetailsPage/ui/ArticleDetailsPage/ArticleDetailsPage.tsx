import { ArticleDetails } from '@/entities/Article';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetailsComment } from '@/features/ArticleDetailsComment';
import { Page } from '@/widgets/Page';
// import { ArticleRecommendation } from 'features/ArticleRecommendation';
// import { ArticleListRecommendation } from 'features/ArticleList';
// import { ArticleRecommendation } from 'features/ArticleRecommendation';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleRating } from '@/features/ArticleRating';


const ArticleDetailsPage = memo(() => {
	const { t, i18n } = useTranslation('article-details')
	const { id } = useParams<{ id: string }>()

	if (!id) {
		return <div>{t('article not found')}</div>
	}

	return (
		<>
			<ArticleDetails id={id} />
			<ArticleRecommendations />
			<ArticleRating articleId={id} />
			<ArticleDetailsComment id={id} />
		</>
	)
})

ArticleDetailsPage.displayName = 'ArticleDetailsPage'
export default ArticleDetailsPage;