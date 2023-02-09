import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import cls from "./Button.module.scss"



export const ThemeButton = {
	clear: "clear",

} as const;
export type ThemeButton = keyof typeof ThemeButton;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		className,
		children,
		theme,
		...otherProps
	} = props
	return (
		<button
			className={classNames(cls.Button, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	)
}