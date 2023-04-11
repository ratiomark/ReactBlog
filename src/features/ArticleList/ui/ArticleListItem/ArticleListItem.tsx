import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import IconEye from 'shared/assets/icon/eye-20-20.svg'
import { HTMLAttributeAnchorTarget } from 'react';
import { RoutePath } from 'app/providers/router/config/routeConfig/routeConfig';
import { Article, ArticleListView } from 'entities/Article';
import { ArticleTextBlock } from 'entities/Article'
import { ArticleTextComponent } from 'entities/Article'
import cls from './ArticleListItem.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { HStack } from 'shared/ui/Stack';

interface ArticleListItemProps {
	className?: string
	article: Article
	view: ArticleListView
	target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = (props: ArticleListItemProps) => {
	const {
		className,
		article,
		view,
		target
	} = props

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
			<AppLink
				withoutOpacity
				className={clsx(
					cls.ArticleListItem,
					cls[view],
					[className])}
				to={RoutePath.articles_details + article.id}
				target={target}
			>
				<Card className={cls.card}>
					<HStack>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.userName} />
						<Text text={article.createdAt} className={cls.articleDateCreation} />
					</HStack>
					<Text text={article.title} className={cls.articleTitle} />
					{types}
					<img src={article.img} alt={article.title} className={cls.articleImage} />
					{textBlock && (
						<ArticleTextComponent block={textBlock} className={cls.textBlock} />
					)}
					<div className={cls.footer}>
						{views}
					</div>
				</Card>
			</AppLink>
		)
	}

	return (
		<AppLink
			withoutOpacity
			className={clsx(
				cls.ArticleListItem,
				cls[view],
				[className])}
			to={RoutePath.articles_details + article.id}
			target={target}
		>
			<Card>
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
		</AppLink>
	)
}