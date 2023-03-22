import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ArticleListItem.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Article, ArticleListView, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextComponent } from '../ArticleTextComponent/ArticleTextComponent';
import IconEye from 'shared/assets/icon/eye-20-20.svg'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/config/routeConfig/routeConfig';

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
	const navigate = useNavigate()
	const onOpenArticle = useCallback(() => {
		navigate(RoutePath.articles_details + article.id)
	}, [article.id, navigate])

	const types = <Text text={article.type.join(', ')} className={cls.articleTypes} />

	const views = (
		<>
			<Text text={String(article.views)} className={cls.views} />
			<Icon Svg={IconEye} />
		</>
	)

	if (view === 'list') {
		const textBlock = article.blocks.find(block => block.type === 'TEXT') as ArticleTextBlock
		return (
			<div className={clsx(
				cls.ArticleListItem,
				cls[view],
				[className])}
			>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Avatar size={30} src={article.img} />
						<Text text={article.user.username} className={cls.userName} />
						<Text text={article.createdAt} className={cls.articleDateCreation} />
					</div>
					<Text text={article.title} className={cls.articleTitle} />
					{types}
					<img src={article.img} alt={article.title} className={cls.articleImage} />
					{textBlock && (
						<ArticleTextComponent block={textBlock} className={cls.textBlock} />
					)}
					<div className={cls.footer}>
						<Button
							onClick={onOpenArticle}
						>
							{t('Read more')}
						</Button>
						{views}
					</div>
				</Card>
			</div>
		)
	}

	return (
		<div className={clsx(
			cls.ArticleListItem,
			cls[view],
			[className])}
		>
			<Card
				onClick={onOpenArticle}
			>
				<div className={cls.imageWrapper}>
					<img src={article.img} alt={article.title} className={cls.articleImage} />
					<Text text={article.createdAt} className={cls.articleDateCreation} />
				</div>
				<div className={cls.infoWrapper}>
					{types}
					{views}
				</div>
				<Text text={article.title} className={cls.articleTitle} />
			</Card>
		</div>
	)
}