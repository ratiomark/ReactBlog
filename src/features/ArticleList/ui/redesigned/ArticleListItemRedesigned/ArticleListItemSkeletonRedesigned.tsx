import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ArticleListItem.module.scss';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { ArticleListView } from '@/entities/Article';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListItemProps {
	className?: string
	view: ArticleListView
}

export const ArticleListItemSkeletonRedesigned = (props: ArticleListItemProps) => {
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
				<Card padding='24' >
					<VStack align='start' gap='gap_16'>
						<VStack align='start' gap='gap_8'>
							<HStack gap='gap_8' align='center' justify='start'>
								<Skeleton borderRadius="50%" height={32} width={32} />
								<Skeleton borderRadius="99px" width={160} height={24} />
							</HStack>
							<Skeleton borderRadius="8px" width={700} height={38} />
							{/* <Skeleton borderRadius="8px" width={520} height={38} /> */}
						</VStack>
						<Skeleton borderRadius="8px" width={480} height={27} />
						<Skeleton borderRadius="8px" width={700} height={420} />
						<VStack align='start' gap='gap_8'>
							<Skeleton borderRadius="8px" width={650} height={14} />
							<Skeleton borderRadius="8px" width={520} height={14} />
							<Skeleton borderRadius="8px" width={580} height={14} />
						</VStack>
						<HStack max justify='end'>
							<Skeleton borderRadius="99px" width={60} height={24} />
						</HStack>
					</VStack>
					{/* <Skeleton width={250} height={24} className={cls.articleTitle} />
					<Skeleton width={200} className={cls.articleImage} />

					<div className={cls.footer}>
						<Skeleton width={200} height={36} />
					</div> */}
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
					<Skeleton width={220} height={220} className={cls.articleImage} />
				</div>
				<div className={cls.infoWrapper}>
					<Skeleton width={130} height={25} />
				</div>
				<Skeleton width={150} height={25} className={cls.articleTitle} />
			</Card>
		</div>
	)
}