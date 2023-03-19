import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleBlock } from '../../model/types/article';
import clsx from 'clsx';
import cls from './ArticleDetails.module.scss';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsData';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import IconEye from 'shared/assets/icon/eye-20-20.svg'
import IconCalendar from 'shared/assets/icon/calendar-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleTextComponent } from '../ArticleTextComponent/ArticleTextComponent';
import { ArticleImageComponent } from '../ArticleImageComponent/ArticleImageComponent';
import { ArticleCodeComponent } from '../ArticleCodeComponent/ArticleCodeComponent';
import { CommentList, CommentType } from 'entities/Comment';

interface ArticleDetailsProps {
	className?: string
	id: string
	
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer
}

const renderBlocks = (block: ArticleBlock) => {
	switch (block.type) {
		case 'TEXT':
			return <ArticleTextComponent block={block} key={block.id} />
		case 'IMAGE':
			return <ArticleImageComponent block={block} key={block.id} />
		case 'CODE':
			return <ArticleCodeComponent block={block} key={block.id} />
		default:
			return null
	}
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
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
			cls.ArticleDetails,
			[className])}
		>
			<div className={cls.avatarWrapper}>
				<Avatar size={200} src={articleData?.img} alt={'avatar'} className={cls.avatar} />
			</div>
			<Text
				title={articleData?.title}
				text={articleData?.subtitle}
			/>
			<div className={cls.dataWrapper}>
				<Icon className={cls.icon} Svg={IconEye} />
				<Text text_s={String(articleData?.views)} />
			</div>
			<div className={cls.dataWrapper}>
				<Icon className={cls.icon} Svg={IconCalendar} />
				<Text text_s={String(articleData?.createdAt)} />
			</div>
			{/* {articleData?.blocks.map(renderBlocks)} */}
			
		</div>
	);
})
ArticleDetails.displayName = 'ArticleDetails'
