import { Article } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'

const recommendationApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		articleRecommendationList: build.query<Article[], number>({
			query: (limit) => ({
				url: '/articles',
				params: {
					_limit: limit,
					_expand: 'user',
				},
			})
		})
	}),
})
// автосгенерированный кух, который использует названия эндпоинта 
export const { useArticleRecommendationListQuery } = recommendationApi
// или можно так:
// const useArticleRecommendationListHook = recommendationApi.useArticleRecommendationListQuery
