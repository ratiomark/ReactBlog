import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import cls from './Button.module.scss'

export const ButtonVariant = {
	clear: 'clear',
	clearInverted: 'clearInverted',
	outline: 'outline',
	outline_red: 'outline_red',
	background: 'background',
	backgroundInverted: 'backgroundInverted',
	backgroundInverted_border: 'backgroundInverted_border',
} as const

export const ButtonSize = {
	size_m: 'size_m',
	size_l: 'size_l',
	size_xl: 'size_xl',
} as const


export type ButtonVariant = keyof typeof ButtonVariant
export type ButtonSize = keyof typeof ButtonSize
// type ValueOf<T> = T[keyof T]
// type ButtonVariant = ValueOf<typeof ButtonVariant>
// type ButtonSize = ValueOf<typeof ButtonSize>

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	className?: string
	variant?: ButtonVariant
	square?: boolean
	size?: ButtonSize
	disabled?: boolean
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		variant = ButtonVariant.outline,
		square,
		size,
		disabled,
		...otherProps
	} = props

	const mods: Record<string, boolean | undefined> = {
		[cls.square]: square,
		[cls.disabled]: disabled
	}

	return (
		<button className={
			classNames(
				cls.Button,
				mods,
				[
					className,
					cls[variant],
					size ? cls[size] : '',
				])}
			// disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
})