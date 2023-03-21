import clsx from 'clsx';
import { Comment } from '../../model/types/comment';
import { useTranslation } from 'react-i18next';
import cls from './CommentList.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { memo } from 'react';

interface CommentListProps {
	className?: string
	isLoading?: boolean
	comments: Comment[]
}

const renderComments = (comment: Comment, isLoading: boolean) => (
	<CommentCard
		key={comment.id}
		className={cls.comment}
		comment={comment}
		isLoading={isLoading}
	/>
)

export const CommentList = memo((props: CommentListProps) => {
	const {
		className,
		comments,
		isLoading = true
	} = props

	const { t } = useTranslation()
	
	return (
		<div className={clsx(
			cls.CommentList,
			[className])}
		>
			{comments?.length
				? comments.map(i => renderComments(i, isLoading))
				: <Text text={t('No comments in article')} />
			}
		</div>
	)
})
CommentList.displayName = 'CommentList'