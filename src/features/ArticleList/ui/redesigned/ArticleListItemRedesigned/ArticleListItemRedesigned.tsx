import clsx from 'clsx';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import IconEye from '@/shared/assets/icon/eye-20-20.svg'
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { obtainRouteArticlesDetails } from '@/app/providers/router/config/routeConfig/routeConfig';
import { Article, ArticleListView, ArticleTextComponentRedesigned } from '@/entities/Article';
import { ArticleTextBlock } from '@/entities/Article'
import cls from './ArticleListItem.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/shared/ui/redesigned/Typography';

interface ArticleListItemProps {
	className?: string
	article: Article
	view: ArticleListView
	target?: HTMLAttributeAnchorTarget
}

interface ArticleListItemListViewProps extends ArticleListItemProps {
	userInfo?: ReactNode
	views?: ReactNode
}

const ArticleListItemListView = (props: ArticleListItemListViewProps) => {
	const {
		article,
		target,
		userInfo,
		views,
		view,
		className,
	} = props

	const textBlock = article.blocks.find(block => block.type === 'TEXT') as ArticleTextBlock
	const { t } = useTranslation('articles-page')

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
				<VStack align='start' gap='gap_16' max>
					<VStack align='start' gap='gap_8' max>
						<HStack max gap='gap_8' align='center' justify='start'>
							{userInfo}
							<Text text={article.createdAt} className={cls.articleDateCreation} />
						</HStack>
						<Heading as='h2' bold size='l' title={article.title} className={cls.articleTitle} />
					</VStack>

					<Heading size='m' title={article.subtitle} className={cls.articleTitle} />
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
					<HStack max>
						<Button>
							{t('read more')}
						</Button>
						{views}
					</HStack>
				</VStack>
			</Card>
		</AppLink>
	)
}

const ArticleListItemGridView = (props: ArticleListItemListViewProps) => {
	const { article,
		target,
		userInfo,
		view,
		className,
	} = props

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
			<Card className={cls.card} >
				<AppImage
					fallback={<Skeleton width={'100%'} height={141} />}
					src={article.img}
					alt={article.title}
					className={cls.articleImage}
				/>
				<VStack gap='gap_4' align='start' max className={cls.infoWrapper} >
					<Heading as='h2' title={article.title} className={cls.articleTitle} />
					<VStack gap='gap_4' align='start' max>
						<HStack justify='between' max>
							<Text text={article.createdAt} className={cls.articleDateCreation} />
							<HStack gap='gap_8'>
								<Icon Svg={IconEye} width={24} height={24} />
								<Text text={String(article.views)} className={cls.views} />
							</HStack>
						</HStack>
						<HStack gap='gap_4'>
							{userInfo}
						</HStack>
					</VStack>
				</VStack>
			</Card>
		</AppLink>
	)
}

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
	const {
		article,
		view,
	} = props

	const userInfo = (
		<>
			<Avatar size={32} src={article.user.avatar} />
			<Text bold text={article.user.username} className={cls.userName} />
		</>
	)

	const views = (
		<>
			<Icon Svg={IconEye} className={cls.icon} />
			<Text text={String(article.views)} className={cls.views} />
		</>
	)

	// большое отображение 
	if (view === 'list') {
		return <ArticleListItemListView userInfo={userInfo} views={views} {...props} />
	}

	return <ArticleListItemGridView userInfo={userInfo} {...props} />
}