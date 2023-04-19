import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginError = (state: StateSchema) => state?.loginForm?.error
export const getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false
export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || ''
export const getLoginUsername = (state: StateSchema) => state?.loginForm?.username || ''