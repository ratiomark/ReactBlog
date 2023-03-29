import { StateSchema } from 'app/providers/StoreProvider';
// import { useAppSelector } from 'app/providers/StoreProvider/config/store';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailsComments?.isLoading
export const getArticleCommentsError = (state: StateSchema) => state.articleDetailsComments?.error
