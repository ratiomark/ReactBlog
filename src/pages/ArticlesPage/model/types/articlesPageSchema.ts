import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
	isLoading: boolean
	error?: string
	view: ArticleListView
	
	// Was ArticlesPage already inited?
	_inited: boolean

	// pagination
	page: number
	limit?: number
	hasMore: boolean
}