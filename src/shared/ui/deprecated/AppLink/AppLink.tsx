import clsx from 'clsx';
import { FC, memo, ReactNode } from 'react';
import { LinkProps, To } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cls from './AppLink.module.scss'


export const AppLinkTheme = {
	primary: 'primary',
	inverted: 'inverted',
	red: 'red'
} as const;

type AppLinkTheme = keyof typeof AppLinkTheme;

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
	children: ReactNode;
	withoutOpacity?: boolean
	to: To
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		to,
		className,
		children,
		theme = AppLinkTheme.primary,
		withoutOpacity = false,
		...otherProps
	} = props

	return (
		<Link
			className={clsx(
				cls.AppLink,
				className,
				{ [cls.withOpacity]: !withoutOpacity },
				cls[theme])
			}
			to={to}
			{...otherProps}
		>
			{children}
		</Link>
	)
})
AppLink.displayName = 'AppLink'