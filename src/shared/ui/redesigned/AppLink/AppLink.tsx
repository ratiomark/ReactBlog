import clsx from 'clsx';
import { memo, ReactNode } from 'react';
import { LinkProps, NavLink, } from 'react-router-dom';
import cls from './AppLink.module.scss'


type AppLinkVariant = 'primary' | 'inverted'


interface AppLinkProps extends LinkProps {
	className?: string;
	variant?: AppLinkVariant;
	children: ReactNode;
	activeClassName?: string;
	additionalActiveClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		to,
		className,
		children,
		activeClassName,
		additionalActiveClassName,
		variant = 'primary',
		...otherProps
	} = props

	return (
		<NavLink
			className={({ isActive }) => clsx(
				cls.AppLink,
				cls[variant],
				(isActive && !additionalActiveClassName) ? activeClassName : '',
				(isActive && additionalActiveClassName) ? additionalActiveClassName : '',
				className,
			)}
			{...otherProps}
			to={to}
		>
			{children}
		</NavLink>
	)
})
AppLink.displayName = 'AppLink'