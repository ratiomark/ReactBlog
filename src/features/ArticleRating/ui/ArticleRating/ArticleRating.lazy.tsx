import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazyWithoutSuspense = lazy(() => import('./ArticleRating'))

export const ArticleRatingLazyWithSuspense = (props: ArticleRatingProps) => {
	return (
		<Suspense fallback={<Skeleton width={'100%'} height='120px' />}>
			<ArticleRatingLazyWithoutSuspense {...props} />
		</Suspense>
	)
}