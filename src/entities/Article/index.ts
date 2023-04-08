export { ArticleTabs } from './ui/ArticleTabs/ArticleTabs';

export { ArticleSortSwitcher } from './ui/ArticleSortSwitcher/ArticleSortSwitcher';

export { getArticleDetailsData } from './model/selectors/getArticleDetailsData';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice';
export { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { ArticleSortField } from './model/types/article'
export type { ArticleSortFieldType, Article, ArticleListView, ArticleType } from './model/types/article'
export { ArticleTextBlock } from './model/types/article';
export { ArticleTextComponent } from './ui/ArticleTextComponent/ArticleTextComponent';