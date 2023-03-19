import clsx from 'clsx';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
	className?: string
	comment: Comment,
	isLoading?: boolean
}

export const CommentCard = (props: CommentCardProps) => {
	const {
		className,
		comment,
		isLoading,
	} = props

	


	let content;
	if (isLoading) {
		content = (<>
			<div className={cls.commentHeader}>
				<Skeleton width={50} height={50} borderRadius={'50%'} />
				<Skeleton height={16} width={120} className={cls.commentUserName} />
			</div>
			<Skeleton width={'100%'} height={50} className={cls.commentText} />
		</>)
	} else {
		content = (<>
			<div className={cls.commentHeader}>
				<Avatar size={50} src={comment.user.avatar} />
				<Text text={comment.user.username} className={cls.commentUserName} />
			</div>
			<Text text={comment.text} className={cls.commentText} />
		</>)
	}

	return (
		<div className={clsx(
			cls.CommentCard,
			[className])}
		>
			{content}
			{/* <div className={cls.commentHeader}>
				<Avatar size={50} src={comment.user.avatar} />
				<Text text={comment.user.username} className={cls.commentUserName} />
			</div>
			<Text text={comment.text} className={cls.commentText} /> */}
		</div>
	);
}