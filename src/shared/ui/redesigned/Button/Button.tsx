import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import cls from './Button.module.scss'
import clsx from 'clsx'

export type ButtonVariant =
	| 'clear'
	| 'outline'
	| 'filled'
	| 'success'
	| 'cancel'

export type ButtonSize =
	| 'size_m'
	| 'size_l'
	| 'size_xl'

type ButtonBorderRadius = 'borderRadius_16' | 'borderRadius_34'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	className?: string
	variant?: ButtonVariant
	borderRadius?: ButtonBorderRadius
	square?: boolean
	size?: ButtonSize
	disabled?: boolean
	addonLeft?: ReactNode
	addonRight?: ReactNode
}

// VAR: переделал кнопку, сейчас она не обернута в мемо, потому что не ясно как использоваь memo в данном случае
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
	const {
		className,
		children,
		variant = 'outline',
		square,
		size = 'size_m',
		borderRadius = 'borderRadius_16',
		disabled,
		addonLeft,
		addonRight,
		...otherProps
	} = props

	const mods: Record<string, boolean | undefined> = {
		[cls.square]: square,
		[cls.disabled]: disabled,
		[cls.paddingDefault]: (!addonLeft && !addonRight),
		[cls.paddingWithBothAddon]: (Boolean(addonLeft) && Boolean(addonRight)),
		[cls.paddingWithLeftAddon]: (Boolean(addonLeft) && !addonRight),
		[cls.paddingWithRightAddon]: (!addonLeft && Boolean(addonRight))

	}

	return (
		<button
			ref={forwardedRef}
			className={clsx(
				cls.Button,
				mods,
				cls[variant],
				cls[size],
				cls[borderRadius],
				className
			)}
			{...otherProps}
		>
			{addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
			{children}
			{addonRight && <div className={cls.addonRight}>{addonRight}</div>}

		</button>
	)
})
// Button.displayName = 'Button'