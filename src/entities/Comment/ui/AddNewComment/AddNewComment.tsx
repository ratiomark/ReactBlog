import clsx from 'clsx';
import { ChangeEvent, MouseEvent, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { text } from 'stream/consumers';
import cls from './AddNewComment.module.scss';
import { TextArea } from '@/shared/ui/deprecated/TextArea/TextArea';

interface AddNewCommentProps {
	className?: string
	text?: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	// onChange: (event: ChangeEvent<HTMLInputElement>) => void
	onSendNewComment?: (event: any) => any
}

export const AddNewComment = (props: AddNewCommentProps) => {
	const {
		className,
		text,
		onChange,
		onSendNewComment
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.addNewComment,
			[className])}
		>
			<TextArea
				value={text}
				onChangeEvent={onChange}
			/>
			{/* <Input
				value={text}
				onChangeEvent={onChange}
			/> */}
			<Button
				onClick={onSendNewComment}
			>
				{t('Send comment')}
			</Button>
		</div>
	);
}