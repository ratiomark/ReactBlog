import clsx from 'clsx';
import { ComponentProps, ElementType, memo } from 'react';
import cls from './Heading.module.scss'
import { title } from 'process';


export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

const mapSizeToClass: Record<TextSize, string> = {
	s: 'size_s',
	m: 'size_m',
	l: 'size_l',
};


export type TextOwnProps<E extends ElementType = ElementType> = {
	className?: string;
	title?: string;
	variant?: TextVariant;
	align?: TextAlign;
	size?: TextSize;
	saveOriginal?: boolean;
	'data-testid'?: string;
	bold?: boolean;
	as?: E
}

export type TextProps<E extends ElementType> = TextOwnProps<E> &
	Omit<ComponentProps<E>, keyof TextOwnProps>


const defaultElement = 'h3'

export const Heading = memo(
	<E extends ElementType = typeof defaultElement>(props: TextProps<E>) => {
		const {
			className,
			title,
			variant = 'primary',
			align = 'left',
			size = 'm',
			bold = false,
			saveOriginal,
			as: TagName = defaultElement,
			'data-testid': dataTestId = 'Text',
		} = props;

		const sizeClass = mapSizeToClass[size];

		const additionalClasses = [className, cls[variant], cls[align], cls[sizeClass]];


		return (
			<TagName
				className={clsx(
					additionalClasses ?? '',
					{
						[cls.saveOriginal]: saveOriginal,
						[cls.bold]: bold,
					},
				)}
				data-testid={`${dataTestId}.Header`}
			>
				{title ?? 'Что-то пошло не так, обновите пожалуйста страницу'}
			</TagName>
		)
	})
Heading.displayName = 'Heading'