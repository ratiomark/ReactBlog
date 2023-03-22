import { ArticleDetails } from 'entities/Article';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetailsComment } from 'features/ArticleDetailsComment';


const ArticleDetailsPage = memo(() => {
	const { t, i18n } = useTranslation('article-details')
	const { id } = useParams<{ id: string }>()

	if (!id) {
		return <div>{t('article not found')}</div>
	}

	return (
		<div>
			{/* <span>{t('ARTICLES')}</span> */}
			{/* <Button */}

			{/* // >Назад к списку</Button> */}

			<ArticleDetails
				id={id}
			/>
			<ArticleDetailsComment
				id={id}
			/>
			{/* <AddNewComment />
			<CommentList111
				isLoading={commentsIsLoading}
				comments={comments} /> */}
		</div>
	)
})

ArticleDetailsPage.displayName = 'ArticleDetailsPage'
export default ArticleDetailsPage;