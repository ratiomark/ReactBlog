import { ChangeEvent, FocusEvent, InputHTMLAttributes, KeyboardEvent, memo, useEffect, useRef, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames'
import { ValidationErrorText } from '@/shared/lib/helpers/validation/validationErrorTexts';
import { Text } from '../Text/Text';
import cls from './Input.module.scss'


// Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLInputElement>
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onBlur'>

// Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	autoFocus?: boolean;
	readonly?: boolean;
	inputErrors?: ValidationErrorText[]
	// onChange?: (value: string | ChangeEvent<HTMLInputElement>) => void;
	onChangeEvent?: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeString?: (value: string) => void;
	onBlur?: (value: string) => void;
	onValidate?: (value: any) => void
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
//eslint-disable-next-line
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChangeEvent,
		onChangeString,
		onBlur,
		onValidate,
		onKeyPress,
		type = 'text',
		readonly,
		inputErrors = [],
		...otherProps
		// autoFocus,
	} = props

	// const [isFocus, setIsFocus] = useState(false)
	const isBlurHappened = useRef<boolean>(false)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (isBlurHappened.current) {
			onValidate?.(e.target.value)
		}
		if (onChangeEvent) {
			onChangeEvent(e)
			return
		}
		onChangeString?.(e.target.value)
	}

	// const onFocus = () => {
	// 	setIsFocus(true)
	// }
	const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
		isBlurHappened.current = true
		// setIsFocus(false)
		onValidate?.(e.target.value)
		onBlur?.(e.target.value)
	}

	return (
		<>
			<input
				// ref={myRef}
				// autoFocus
				className={classNames(cls.Input,
					{ [cls.hasErrors]: inputErrors.length > 0 },
					[className])
				}
				type={type}
				onChange={onChangeHandler}
				value={value}
				// onFocus={onFocus}
				onBlur={onBlurHandler}
				disabled={readonly}
				onKeyDown={onKeyPress}
				{...otherProps}
			/>
			{/* {validationErrors} */}
			{inputErrors.length > 0 && inputErrors.map(i =>
				<Text
					text_s={i}
					align='left'
					key={i}
					variant='error'
				/>)}
		</>
	)
})
Input.displayName = 'Input'

