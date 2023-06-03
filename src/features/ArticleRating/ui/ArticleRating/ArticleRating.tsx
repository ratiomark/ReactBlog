import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';
import cls from './ArticleRating.module.scss';

export interface ArticleRatingProps {
	className?: string
	articleId: string
}

const ArticleRating = (props: ArticleRatingProps) => {
	const {
		className,
		articleId
	} = props

	const userData = useSelector(getUserAuthData)

	const { data, isLoading } = useArticleRating({
		articleId,
		userId: userData?.id ?? ''
	})

	// мутация возвращает массив, где первый аргумент - это сама функция которая вызывает мутацию, а второй - это объект с полями isError, isLoading и т.д.
	const [rateArticleMutation, { isError, isLoading: isLoadingMutation }] = useRateArticle()

	const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
		try {
			rateArticleMutation({
				rate: starsCount,
				userId: userData?.id ?? '',
				articleId,
				feedback,
			})
		} catch (error) {
			console.log(error)
		}
	}, [articleId, rateArticleMutation, userData?.id])

	const onAccept = useCallback((starsCount: number, feedback?: string) => {
		handleRateArticle(starsCount, feedback)
	}, [handleRateArticle])

	const onCancel = useCallback((starsCount: number) => {
		handleRateArticle(starsCount)
	}, [handleRateArticle])

	if (isLoading) return <Skeleton width={'100%'} height='120' />

	const ratingData = data?.[0]

	return (
		<RatingCard
			onAccept={onAccept}
			onCancel={onCancel}
			rate={ratingData?.rate}
			hasFeedback
			className={className}
		/>
	)
}
export default ArticleRating