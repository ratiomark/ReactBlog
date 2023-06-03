import clsx from 'clsx';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import IconEye from '@/shared/assets/icon/eye-20-20.svg'
import { HTMLAttributeAnchorTarget } from 'react';
import { obtainRouteArticlesDetails } from '@/app/providers/router/config/routeConfig/routeConfig';
import { Article, ArticleListView, ArticleTextComponentRedesigned } from '@/entities/Article';
import { ArticleTextBlock } from '@/entities/Article'
import { ArticleTextComponent } from '@/entities/Article'
import cls from './ArticleListItem.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useTranslation } from 'react-i18next';

interface ArticleListItemProps {
	className?: string
	article: Article
	view: ArticleListView
	target?: HTMLAttributeAnchorTarget
}

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
	const {
		className,
		article,
		view,
		target
	} = props

	const types = null


	const { t } = useTranslation('articles-page')
	// const types = <Text text={article.type.join(', ')} className={cls.articleTypes} />

	const views = (
		<>
			<Icon Svg={IconEye} className={cls.icon} />
			<Text text={String(article.views)} className={cls.views} />
		</>
	)

	// большое отображение 
	if (view === 'list') {
		const textBlock = article.blocks.find(block => block.type === 'TEXT') as ArticleTextBlock
		return (
			<AppLink
				className={clsx(
					cls.ArticleListItem,
					cls[view],
					className
				)}
				to={obtainRouteArticlesDetails(article.id)}
				target={target}
			>
				<Card padding='24' className={cls.card}>
					<VStack align='start' gap='gap_16'>
						<VStack align='start' gap='gap_8'>
							<HStack max gap='gap_8' align='center' justify='start'>
								<Avatar size={32} src={article.user.avatar} />
								<Text bold text={article.user.username} className={cls.userName} />
								<Text text={article.createdAt} className={cls.articleDateCreation} />
							</HStack>
							<Text bold size='l' title={article.title} className={cls.articleTitle} />
						</VStack>

						<Text size='m' title={article.subtitle} className={cls.articleTitle} />
						<AppImage
							fallback={<Skeleton width={'100%'} height={'200px'} />}
							src={article.img}
							alt={article.title}
							className={cls.articleImage}
						/>
						{textBlock?.paragraphs && (
							<div className={cls.descriptionWrapper}>
								<Text className={cls.description} text={textBlock.paragraphs.slice(0, 4).join('\n')} />
							</div>
						)}
						<HStack
							max
						>
							<Button>
								{/* <AppLink to={obtainRouteArticlesDetails(article.id)}> */}
								{t('read more')}
								{/* </AppLink> */}
							</Button>
							{views}
						</HStack>
					</VStack>
				</Card>
			</AppLink>
		)
	}

	return (
		<AppLink
			className={clsx(
				cls.ArticleListItem,
				cls[view],
				className
			)}
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