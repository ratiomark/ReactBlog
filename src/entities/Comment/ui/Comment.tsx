import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Comment.module.scss';

interface CommentProps {
	className?: string
}

export const Comment = (props: CommentProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.comment,
			[className])}
		>

		</div>
	);
}