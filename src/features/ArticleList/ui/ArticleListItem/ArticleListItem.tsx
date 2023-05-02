import clsx from 'clsx';
import { Text } from '@/shared/ui/Text/Text';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import IconEye from '@/shared/assets/icon/eye-20-20.svg'
import { HTMLAttributeAnchorTarget } from 'react';
import { obtainRouteArticlesDetails } from '@/app/providers/router/config/routeConfig/routeConfig';
import { Article, ArticleListView } from '@/entities/Article';
import { ArticleTextBlock } from '@/entities/Article'
import { ArticleTextComponent } from '@/entities/Article'
import cls from './ArticleListItem.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

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
				to={obtainRouteArticlesDetails(article.id)}
				target={target}
			>
				<Card className={cls.card}>
					<HStack max>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.userName} />
						<Text text={article.createdAt} className={cls.articleDateCreation} />
					</HStack>
					<Text text={article.title} className={cls.articleTitle} />
					{types}
					<AppImage
						fallback={<Skeleton width={'100%'} height={'200px'} />}
						src={article.img}
						alt={article.title}
						className={cls.articleImage}
					/>
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
			to={obtainRouteArticlesDetails(article.id)}
			target={target}
		>
			<Card>
				<div className={cls.imageWrapper}>
					<AppImage
						fallback={<Skeleton width='100%' height='100%' />}
						src={article.img}
						alt={article.title}
						className={cls.articleImage}
					/>
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