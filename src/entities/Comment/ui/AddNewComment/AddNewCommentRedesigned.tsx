import clsx from 'clsx';
import { ChangeEvent, MouseEvent, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import cls from './AddNewCommentRedesigned.module.scss';
import { TextArea } from '@/shared/ui/redesigned/TextArea/TextArea';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import SendIcon from '@/shared/assets/icons_redesigned/send.svg'
import { HStack } from '@/shared/ui/redesigned/Stack';

interface AddNewCommentProps {
	className?: string
	text?: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	// onChange: (event: ChangeEvent<HTMLInputElement>) => void
	onSendNewComment: () => void
}

export const AddNewCommentRedesigned = (props: AddNewCommentProps) => {
	const {
		className,
		text,
		onChange,
		onSendNewComment
	} = props

	const { t } = useTranslation()

	return (
		<HStack
			max
			gap="gap_16"
			className={clsx(
				cls.AddNewComment,
				[className])}
		>
			<TextArea
				className={cls.textArea}
				value={text}
				onChangeEvent={onChange}
				placeholder='Написать комментарий...'
			/>
			<Icon
				Svg={SendIcon}
				clickable
				onClick={onSendNewComment}
				className={cls.icon}
			/>
			{/* <Button
				onClick={onSendNewComment}
			>
				{t('Send comment')}
			</Button> */}
		</HStack>
	);
}