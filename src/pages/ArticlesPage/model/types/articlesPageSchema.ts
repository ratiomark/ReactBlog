import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
	isLoading: boolean
	// articles?: Article[]
	error?: string
	view: ArticleListView
}