import { ChangeEvent, FocusEvent, InputHTMLAttributes, KeyboardEvent, memo, MutableRefObject, useEffect, useRef, } from 'react';
import cls from './TextArea.module.scss'
import clsx from 'clsx';


// Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLTextAreaElement>
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onBlur'>

// Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	autoFocus?: boolean;
	readonly?: boolean;
	// inputErrors?: ValidationErrorText[]
	// onChange?: (value: string | ChangeEvent<HTMLTextAreaElement>) => void;
	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onChangeString?: (value: string) => void;
	onBlur?: (value: string) => void;
	onValidate?: (value: any) => void
	onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
	autoHeight?: boolean
}
//eslint-disable-next-line
export const TextArea = memo((props: InputProps) => {
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
		// inputErrors = [],
		autoHeight = true,
		...otherProps
		// autoFocus,
	} = props


	useEffect(() => {
		const area = textAreaRef.current
		if (textAreaRef.current && autoHeight) {
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`
		}
		return (() => {
			area.style.height = 'auto'
		})
	}, [value, autoHeight])

	const isBlurHappened = useRef<boolean>(false)
	const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (isBlurHappened.current) {
			onValidate?.(e.target.value)
		}
		if (onChangeEvent) {
			onChangeEvent(e)
			return
		}
		onChangeString?.(e.target.value)
	}


	const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
		isBlurHappened.current = true
		// setIsFocus(false)
		onValidate?.(e.target.value)
		onBlur?.(e.target.value)
	}

	return (
		<>
			<textarea
				// ref={myRef}
				// autoFocus
				ref={textAreaRef}
				rows={1}
				className={clsx(cls.Input, [className])}
				onChange={onChangeHandler}
				value={value}
				// onFocus={onFocus}
				onBlur={onBlurHandler}
				disabled={readonly}
				onKeyDown={onKeyPress}
				{...otherProps}
			/>
			{/* {validationErrors} */}
			{/* {inputErrors.length > 0 && inputErrors.map(i =>
				<Text
					text_s={i}
					align='left'
					key={i}
					variant='error'
				/>)} */}
		</>
	)
})
TextArea.displayName = 'TextArea'

