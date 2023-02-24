import { classNames } from 'shared/lib/helpers/classNames/classNames'
import cls from "./Text.module.scss"


export const TextVariant = {
	primary: "primary",
	error: "error",
} as const;

export type TextVariant = keyof typeof TextVariant

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	variant?: TextVariant;
}

export const Text = (props: TextProps) => {
	const {
		className,
		text,
		title,
		variant = TextVariant.primary
	} = props

	// const mods = {
	// 	[cls.error]:  
	// }

	return (
		<div className={classNames(cls.Text, {}, [className, cls[variant]])} >
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	)
}