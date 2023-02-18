import { FC } from 'react';
import { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import styles from "./AppLink.module.scss"

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
	red: "red"
} as const;
type AppLinkTheme = keyof typeof AppLinkTheme;
// console.log(AppLinkTheme.PRIMARY)


interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
	const {
		to,
		className,
		children,
		theme = AppLinkTheme.primary,
		...otherProps
	} = props

	return (
		<Link
			{...otherProps}
			to={to}
			className={classNames(styles.AppLink, {}, [className, styles[theme]])}
		>
			{children}
		</Link>
	)
}