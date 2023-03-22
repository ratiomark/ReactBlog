import { StateSchema } from 'app/providers/StoreProvider'

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error || false
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || 'list'