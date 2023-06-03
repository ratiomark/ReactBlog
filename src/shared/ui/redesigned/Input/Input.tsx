import { ChangeEvent, FocusEvent, InputHTMLAttributes, KeyboardEvent, ReactNode, memo, useRef, useState, } from 'react';
import { ValidationErrorText } from '@/shared/lib/helpers/validation/validationErrorTexts';
import cls from './Input.module.scss'
import clsx from 'clsx';
import { HStack } from '../Stack';
import { Label } from '@headlessui/react/dist/components/label/label';
import { Text } from '../Text/Text';


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
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
	label?: string

}
//eslint-disable-next-line
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChangeEvent,
		onChangeString,
		onBlur,
		max,
		onValidate,
		onKeyPress,
		type = 'text',
		readonly,
		inputErrors = [],
		addonLeft,
		addonRight,
		label,
		...otherProps
		// autoFocus,
	} = props

	const [isFocus, setIsFocus] = useState(false)
	const isBlurHappened = useRef<boolean>(false)
	const hasErrors = Boolean(inputErrors.length)

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

	const onFocus = () => {
		setIsFocus(true)
	}

	const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
		isBlurHappened.current = true
		setIsFocus(false)
		onValidate?.(e.target.value)
		onBlur?.(e.target.value)
	}

	let inputErrorsRendered;
	if (hasErrors) {
		inputErrorsRendered = inputErrors.map(i => (
			<Text
				text={i}
				align='left'
				key={i}
				variant='error'
				className={clsx(cls.inputError, cls.inputErrorActive)}
			/>
		))
	}


	if (addonLeft || addonRight) {
		const mods: Record<string, boolean | undefined> = {
			[cls.focused]: isFocus,
			[cls.readonly]: readonly,
			[cls.focused]: isFocus,
			[cls.hasErrors]: hasErrors,
			[cls.paddingWithBothAddon]: (Boolean(addonLeft) && Boolean(addonRight)),
			[cls.paddingWithLeftAddon]: (Boolean(addonLeft) && !addonRight),
			[cls.paddingWithRightAddon]: (!addonLeft && Boolean(addonRight))

		}

		const input = (
			<input
				// ref={myRef}
				// autoFocus
				className={clsx(cls.inputInWrapper,
					{
						// [cls.hasErrors]: hasErrors,
					}
				)}
				type={type}
				onChange={onChangeHandler}
				value={value}
				onFocus={onFocus}
				onBlur={onBlurHandler}
				readOnly={readonly}
				// disabled={readonly}
				onKeyDown={onKeyPress}
				{...otherProps}
			/>
		)

		return (
			<HStack max className={clsx(cls.InputWrapper, mods, className)}>
				{addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
				{input}
				{inputErrorsRendered}
				{addonRight && <div className={cls.addonRight}>{addonRight}</div>}
			</HStack>
		)
	}

	// если нет аддонов, то возвращаю просто инпут
	return (
		<>
			{label && <Text text={label} />}
			<input
				// ref={myRef}
				// autoFocus
				className={clsx(
					cls.Input,
					{
						[cls.hasErrors]: hasErrors,
						[cls.focused]: isFocus,
						[cls.readonly]: readonly,
					},
					className
				)}
				type={type}
				onChange={onChangeHandler}
				value={value}
				onFocus={onFocus}
				onBlur={onBlurHandler}
				// readOnly={readonly}
				disabled={readonly}
				onKeyDown={onKeyPress}
				{...otherProps}
			/>
			{inputErrorsRendered}
		</>
	)
})
Input.displayName = 'Input'

