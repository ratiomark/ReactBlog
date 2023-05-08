import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleRecommendationIsLoading = (state: StateSchema) => state.articleRecommendations?.isLoading
export const getArticleRecommendationError = (state: StateSchema) => state.articleRecommendations?.error
