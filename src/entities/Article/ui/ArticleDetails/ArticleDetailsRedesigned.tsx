import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleBlock } from '../../model/types/article';
import clsx from 'clsx';
import cls from './ArticleDetails.module.scss';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsData';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import IconEye from '@/shared/assets/icon/eye-20-20.svg'
import IconCalendar from '@/shared/assets/icon/calendar-20-20.svg'
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { ArticleTextComponentRedesigned } from '../ArticleTextComponent/ArticleTextComponentRedesigned';
import { ArticleImageComponentRedesigned } from '../ArticleImageComponent/ArticleImageComponentRedesigned';
import { ArticleCodeComponentRedesigned } from '../ArticleCodeComponent/ArticleCodeComponentRedesigned';
import { obtainRouteArticles } from '@/app/providers/router/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { ArticleDetails } from './ArticleDetails';
import { Heading } from '@/shared/ui/redesigned/Typography';

interface ArticleDetailsProps {
	className?: string
	id: string

}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
}

const renderBlocks = (block: ArticleBlock) => {
	switch (block.type) {
		case 'TEXT':
			return <ArticleTextComponentRedesigned block={block} key={block.id} />
		case 'IMAGE':
			return <ArticleImageComponentRedesigned block={block} key={block.id} />
		case 'CODE':
			return <ArticleCodeComponentRedesigned block={block} key={block.id} />
		default:
			return null
	}
}

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsProps) => {
	const {
		className,
		id,

	} = props
	const articleData = useSelector(getArticleDetailsData)
	const isLoading = useSelector(getArticleDetailsIsLoading)
	const error = useSelector(getArticleDetailsError)
	const { dispatch, store } = useAsyncReducer({ reducers: reducers, removeAfterUnmount: true })

	const { t } = useTranslation()

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id))
		}
	}, [dispatch, id])

	if (isLoading) {
		return (
			<div className={cls.ArticleDetails}>
				<Skeleton className={cls.avatar} width={200} height={200} borderRadius="50%" />
				<Skeleton className={cls.title} width={300} height={32} />
				<Skeleton className={cls.skeleton} width={600} height={24} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
			</div>
		)
	}
	if (error) {
		return <Text text={`Произошла ошибка ${error}`} variant={'error'} align='center' />
	}

	return (
		<div className={clsx(
			cls.ArticleDetailsRedesigned,
			[className])}
		>
			<AppLink to={obtainRouteArticles()} >Back to articles</AppLink>
			<div className={cls.avatarWrapper}>
				<Avatar size={200} src={articleData?.img} alt={'avatar'} className={cls.avatar} />
			</div>
			<Heading
				as='h1'
				title={articleData?.title}
			/>
			<Text
				// title={articleData?.title}
				text={articleData?.subtitle}
			/>
			<div className={cls.dataWrapper}>
				<Icon className={cls.icon} Svg={IconEye} />
				<Text text={String(articleData?.views)} />
			</div>
			<div className={cls.dataWrapper}>
				<Icon className={cls.icon} Svg={IconCalendar} />
				<Text text={String(articleData?.createdAt)} />
			</div>
			{articleData?.blocks.map(renderBlocks)}

		</div>
	);
})
ArticleDetails.displayName = 'ArticleDetails'
