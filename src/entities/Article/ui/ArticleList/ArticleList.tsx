import clsx from 'clsx';
import { Article, ArticleListView } from '../../model/types/article';
import { useTranslation } from 'react-i18next';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
	className?: string
	articles?: Article[]
	view?: ArticleListView
	isLoading?: boolean
}

export const ArticleList = (props: ArticleListProps) => {
	const {
		className,
		view = 'list',
		isLoading,
		articles = []
	} = props

	const { t } = useTranslation()
	const renderArticle = (article: Article) => (
		<ArticleListItem
			article={article}
			view={view}
		/>
	)
	return (
		<div className={clsx(
			cls.ArticleList,
			[className])}
		>
			{articles.length > 0
				? articles.map(renderArticle)
				: null
			}
		</div>
	);
}