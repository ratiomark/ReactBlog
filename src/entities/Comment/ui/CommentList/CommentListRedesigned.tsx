import clsx from 'clsx';
import { Comment } from '../../model/types/comment';
import { useTranslation } from 'react-i18next';
import cls from './CommentList.module.scss';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { CommentCardRedesigned } from '../CommentCard/CommentCardRedesigned';

interface CommentListProps {
	className?: string
	isLoading?: boolean
	comments: Comment[]
}

const renderComments = (comment: Comment, isLoading: boolean) => (
	<CommentCardRedesigned
		key={comment.id}
		// className={cls.comment}
		comment={comment}
		isLoading={isLoading}
	/>
)

export const CommentListRedesigned = memo((props: CommentListProps) => {
	const {
		className,
		comments,
		isLoading = true
	} = props

	const { t } = useTranslation()

	return (
		<VStack
			max
			gap='gap_16'
			// align='start'
			as='section'
			className={clsx(
				cls.CommentList,
				[className])}
		>
			{comments?.length
				? comments.map(i => renderComments(i, isLoading))
				: <Text text={t('No comments in article')} />
			}
		</VStack>
	)
})
CommentListRedesigned.displayName = 'CommentList'