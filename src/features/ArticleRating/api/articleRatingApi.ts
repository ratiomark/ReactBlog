import { Rating } from '@/entities/Rating'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetArticleArg {
	userId: string
	articleId: string
}

interface RateArticleArg extends GetArticleArg {
	rate: number
	feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRating: build.query<Rating[], GetArticleArg>({
			// благодаря дженерику выше, rtk понимает что за типы у articleId и userId
			query: ({ articleId, userId }) => ({
				url: '/article-ratings',
				params: {
					userId,
					articleId
				}
			})
		}),
		rateArticle: build.mutation<void, RateArticleArg>({
			// благодаря дженерику выше, rtk понимает что за типы у articleId и userId
			query: (arg) => ({
				url: '/article-ratings',
				method: 'POST',
				body: arg,
			})
		})
	}),
})
// автосгенерированный кух, который использует названия эндпоинта 
export const { useGetArticleRatingQuery: useArticleRating } = articleRatingApi
export const { useRateArticleMutation: useRateArticle } = articleRatingApi
// или можно так:
// const useNotification = articleRatingApi.usegetArticleRatingQuery
