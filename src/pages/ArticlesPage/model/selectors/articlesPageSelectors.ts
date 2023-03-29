import { StateSchema } from 'app/providers/StoreProvider'

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error || false
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || 'list'

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 3
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore

export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited
