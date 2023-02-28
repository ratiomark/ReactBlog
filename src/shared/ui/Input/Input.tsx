import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import cls from './Input.module.scss'


// Omit позволяет сконструировать тип, который будет включять в себя все пропсы, кроме некоторых указанных отдельно
// Это нужно для того, чтобы в InputProps можно было без проблем определить пропсы которые уже существуют в InputHTMLAttributes<HTMLInputElement>
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

// Расширяю стандартные пропсы которые принимает инпут, тут использую результат Omit с выпилиенными value, onChange
interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	autoFocus?: boolean;
	onChange?: (value: string) => void;
}
//eslint-disable-next-line
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		// autoFocus,
		...otherProps
	} = props

	const [isFocus, setIsFocus] = useState(false)
	const myRef = useRef<HTMLInputElement>(null)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}
	const onFocus = () => {
		setIsFocus(true)
	}
	const onBlur = () => {
		setIsFocus(false)
	}

	// useEffect(() => {
	// 	if (autoFocus) {
	// 		setIsFocus(true)
	// 		myRef.current?.focus()
	// 	}
	// }, [autoFocus])
	// const callbackRef = useCallback(inputElement => {
	// 	if (inputElement) {
	// 		inputElement.focus();
	// console.log(autoFocus, 'автофокус')
	// 	}
	// }, []);


	return (
		<input
			// ref={myRef}
			// autoFocus
			className={classNames(cls.Input, {}, [className])}
			type={type}
			onChange={onChangeHandler}
			value={value}
			onFocus={onFocus}
			onBlur={onBlur}
			{...otherProps}
		/>
	)
})

function useCallback(arg0: (inputElement: any) => void, arg1: undefined[]) {
	throw new Error('Function not implemented.');
}
