import clsx from 'clsx';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Flex.module.scss';

export type FlexJustify =
	| 'start'
	| 'center'
	| 'end'
	| 'between'

export type FlexAlign =
	| 'start'
	| 'end'
	| 'center'
	| 'left'
	| 'right'

export type FlexDirection =
	| 'row'
	| 'column'

export type FlexGap =
	| 'gap_2'
	| 'gap_4'
	| 'gap_8'
	| 'gap_12'
	| 'gap_16'
	| 'gap_20'

export interface FlexProps {
	className?: string
	justify?: FlexJustify
	align?: FlexAlign
	direction?: FlexDirection
	wrap?: boolean
	max?: boolean
	gap?: FlexGap
	children?: ReactNode
	// wrap?: boolean
}

export const Flex = (props: FlexProps) => {
	const {
		className,
		justify = 'start',
		align = 'center',
		direction = 'row',
		wrap,
		max,
		gap,
		children
		// wrap='start' ,
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.Flex,
			cls[`justify__${justify}`],
			cls[`align__${align}`],
			cls[`direction__${direction}`],
			gap ? cls[gap] : null,
			{
				[cls.wrap]: wrap,
				[cls.max]: max,
			},
			[className])}
		>
			{children}
		</div>
	)
}