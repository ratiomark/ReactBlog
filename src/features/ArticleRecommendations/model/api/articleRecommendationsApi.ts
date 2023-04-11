import { rtkApi } from 'shared/api/rtkApi'

const recommendationApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		articleRecommendationList: build.query({
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
