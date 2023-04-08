import { StateSchema } from 'app/providers/StoreProvider'

export const getArticleListArticlesPageError = (state: StateSchema) => state.articlesPage?.error || ''
export const getArticleListArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading


export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 3
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore

export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || 'list'
export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort || 'createdAt'
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order || 'asc'
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? ''
export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? 'ALL'
