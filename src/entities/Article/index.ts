export { ArticleTabs } from './ui/ArticleTabs/ArticleTabs';

export { ArticleSortSwitcher } from './ui/ArticleSortSwitcher/ArticleSortSwitcher';

export { getArticleDetailsData } from './model/selectors/getArticleDetailsData';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice';
export { ArticleTextComponent } from './ui/ArticleTextComponent/ArticleTextComponent';
export { ArticleTextComponentRedesigned } from './ui/ArticleTextComponent/ArticleTextComponentRedesigned';
export { ArticleSortField } from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export type { ArticleSortFieldType, Article, ArticleListView, ArticleType } from './model/types/article'
export type { ArticleTextBlock } from './model/types/article';