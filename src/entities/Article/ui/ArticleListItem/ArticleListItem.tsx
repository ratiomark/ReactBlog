import clsx from 'clsx';
import { Article, ArticleListView } from '../../model/types/article';
import { useTranslation } from 'react-i18next';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
	className?: string
	article: Article
	view: ArticleListView
}

export const ArticleListItem = (props: ArticleListItemProps) => {
	const {
		className,
		article,
		view
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ArticleListItem,
			[className])}
		>
			{article.title}
		</div>
	);
}