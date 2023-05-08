import clsx from 'clsx';
import { memo } from 'react';
import cls from './Text.module.scss'


export const TextVariant = {
	primary: 'primary',
	error: 'error',
	inputError: 'inputError'
} as const;

export type TextVariant = keyof typeof TextVariant
export type TextAlign = 'left' | 'center' | 'right'
interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	text_s?: string;
	variant?: TextVariant;
	align?: TextAlign;
	saveOriginal?: boolean
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		title,
		text,
		text_s,
		variant = TextVariant.primary,
		align = 'left',
		saveOriginal = false
	} = props


	return (
		<div className={clsx(
			cls.Text,
			{ [cls.saveOriginal]: saveOriginal },
			cls[variant],
			cls[align],
			[className]
		)}
		>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
			{text_s && <p className={cls.text_s}>{text_s}</p>}
		</div>
	)
})
Text.displayName = 'Text'