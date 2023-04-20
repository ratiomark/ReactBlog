import clsx from 'clsx';
import { FC, memo, ReactNode } from 'react';
import { LinkProps, To } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cls from './AppLink.module.scss'

// export enum AppLinkTheme {
//   PRIMARY = 'primary',
//   SECONDARY = 'secondary'
// }

// type valueof<T> = T[keyof T]
// type actions = {
//   a: {
//     type: 'Reset'
//     data: number
//   }
//   b: {
//     type: 'Apply'
//     data: string
//   }
// }
// type actionValues = valueof<actions>

// type AppLinkThemeType<T> = T[keyof T]
// type AppLinkTheme = typeof AppLinkTheme[keyof typeof AppLinkTheme];

export const AppLinkTheme = {
	primary: 'primary',
	inverted: 'inverted',
	red: 'red'
} as const;

type AppLinkTheme = keyof typeof AppLinkTheme;
// console.log(AppLinkTheme.PRIMARY)


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