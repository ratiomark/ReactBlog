import clsx from 'clsx';
import { memo } from 'react';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Comment } from '../../model/types/comment';
import { obtainRouteProfile } from '@/app/providers/router/config/routeConfig/routeConfig';
import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from './CommentCardRedesigned.module.scss';

interface CommentCardProps {
	className?: string
	comment: Comment,
	isLoading?: boolean
}

export const CommentCardRedesigned = memo((props: CommentCardProps) => {
	const {
		className,
		comment,
		isLoading,
	} = props




	let content;
	if (isLoading) {
		content = (
			<>
				<HStack gap='gap_12' align='center'>
					<Skeleton width={50} height={50} borderRadius={'50%'} />
					<Skeleton height={16} width={120} className={cls.commentUserName} />
				</HStack>
				<Skeleton width={'100%'} height={50} className={cls.commentText} />
			</>
		)
	} else {
		content = (
			<>
				<AppLink to={obtainRouteProfile(comment.user.id)} className={cls.commentHeader}>
					<Avatar size={32} src={comment.user.avatar} />
					<Text text={comment.user.username} bold className={cls.commentUserName} />
				</AppLink>
				{comment.text.split('\n').map((line, index) => (
					<Text text={line === '\n' ? '&nbsp;' : line} saveOriginal key={index} className={cls.commentText} />
				))}
			</>
		)
	}

	return (
		<div className={clsx(
			cls.CommentCard,
			[className])}
		>
			{content}
		</div>
	);
})
CommentCardRedesigned.displayName = 'CommentCard'