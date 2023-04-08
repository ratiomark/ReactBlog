import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';
import { ArticleSortFieldType } from 'entities/Article';
import { ArticleType } from 'entities/Article';
import { SortOrderType } from 'shared/types/SortOrderType';

export interface ArticlesPageSchema extends EntityState<Article> {
	isLoading: boolean
	error?: string

	// Was ArticlesPage already inited?
	_inited: boolean

	// pagination
	page: number
	limit: number
	hasMore: boolean

	// filters/search/view
	view: ArticleListView
	order: SortOrderType
	sort: ArticleSortFieldType
	search: string
	type: ArticleType
}