import clsx from 'clsx';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';

type CardVariant =
	| 'normal'
	| 'outlined'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string
	children: ReactNode
	variant?: CardVariant
	max?: boolean
}

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		variant = 'normal',
		max,
		...otherProps
	} = props

	return (
		<div
			className={clsx(
				cls.Card,
				cls[variant],
				{ [cls.max]: max },
				[className])
			}
			{...otherProps}
		>
			{children}
		</div>
	)
})
Card.displayName = 'Card'