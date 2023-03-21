import clsx from 'clsx';
import { getAddNewCommentError, getAddNewCommentText } from '../../model/selectors/getAddNewComment';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './AddNewComment.module.scss';

interface AddNewCommentProps {
	className?: string
}

const reducers: ReducersList = {
	addNewComment: addNewCommentReducer
}

export const AddNewComment = memo((props: AddNewCommentProps) => {
	const {
		className,

	} = props
	const text = useSelector(getAddNewCommentText)
	const error = useSelector(getAddNewCommentError)
	const { dispatch } = useAsyncReducer({ reducers: reducers })
	const { t } = useTranslation()

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(addNewCommentActions.setCommentText(event.target.value))
	}, [dispatch])

	if (error) {
		return <p>ошибка ошибка ошибка</p>
	}

	return (
		<div className={clsx(
			cls.addNewComment,
			[className])}
		>
			<Input
				value={text}
				onChangeEvent={onChange}
			/>
			<Button >
				{t('Send comment')}
			</Button>
		</div>
	);
})
AddNewComment.displayName = 'AddComment'