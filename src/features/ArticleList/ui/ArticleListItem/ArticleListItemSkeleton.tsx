import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ArticleListItem.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticleListView } from 'entities/Article';

interface ArticleListItemProps {
	className?: string
	view: ArticleListView
}

export const ArticleListItemSkeleton = (props: ArticleListItemProps) => {
	const {
		className,
		view
	} = props
	const { t } = useTranslation()


	if (view === 'list') {
		// const textBlock = article.blocks.find(block => block.type === 'TEXT') as ArticleTextBlock
		return (
			<div className={clsx(
				cls.ArticleListItem,
				cls[view],
				[className])}
			>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Skeleton borderRadius="50%" height={30} width={30} />
						<Skeleton width={150} height={16} className={cls.userName} />
						<Skeleton width={150} height={16} className={cls.articleDateCreation} />
					</div>
					<Skeleton width={250} height={24} className={cls.articleTitle} />
					<Skeleton width={200} className={cls.articleImage} />

					<div className={cls.footer}>
						<Skeleton width={200} height={36} />
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
			>
				<div className={cls.imageWrapper}>
					<Skeleton width={200} height={200} className={cls.articleImage} />
				</div>
				<div className={cls.infoWrapper}>
					<Skeleton width={130} height={16} />
				</div>
				<Skeleton width={150} height={16} className={cls.articleTitle} />
			</Card>
		</div>
	)
}