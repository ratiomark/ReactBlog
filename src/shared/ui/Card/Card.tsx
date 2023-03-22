import clsx from 'clsx';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string
	children: ReactNode
}

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		...otherProps
	} = props

	return (
		<div className={clsx(
			cls.Card,
			[className])}
			{...otherProps}
		>
			{children}
		</div>
	)
})
Card.displayName = 'Card'