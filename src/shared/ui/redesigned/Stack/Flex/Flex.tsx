import clsx from 'clsx';
import { ComponentProps, ElementType, ReactNode, memo } from 'react';
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
	| 'gap_10'
	| 'gap_12'
	| 'gap_16'
	| 'gap_20'
	| 'gap_32'

export type FlexOwnProps<E extends ElementType = ElementType> = {
	className?: string
	justify?: FlexJustify
	align?: FlexAlign
	direction?: FlexDirection
	wrap?: boolean
	max?: boolean
	gap?: FlexGap
	children?: ReactNode
	as?: E
}

export type FlexProps<E extends ElementType> = FlexOwnProps<E> &
	Omit<ComponentProps<E>, keyof FlexOwnProps>


const defaultElement = 'div'

export const Flex = memo(
	<E extends ElementType = typeof defaultElement>(props: FlexProps<E>) => {
		const {
			className,
			justify = 'start',
			align = 'center',
			direction = 'row',
			wrap,
			max,
			gap,
			children,
			as: TagName = defaultElement,
			...otherProps
		} = props

		return (
			<TagName
				className={clsx(
					cls.Flex,
					cls[`justify__${justify}`],
					cls[`align__${align}`],
					cls[`direction__${direction}`],
					gap ? cls[gap] : null,
					{
						[cls.wrap]: wrap,
						[cls.max]: max,
					},
					className)}
				{...otherProps}
			>
				{children}
			</TagName>
		)
	})
Flex.displayName = 'Flex'
// export const Flex =
// 	<E extends ElementType = typeof defaultElement>(props: FlexProps<E>) => {
// 		const {
// 			className,
// 			justify = 'start',
// 			align = 'center',
// 			direction = 'row',
// 			wrap,
// 			max,
// 			gap,
// 			children,
// 			as: TagName = defaultElement,
// 			...otherProps
// 		} = props

// 		return (
// 			<TagName
// 				className={clsx(
// 					cls.Flex,
// 					cls[`justify__${justify}`],
// 					cls[`align__${align}`],
// 					cls[`direction__${direction}`],
// 					gap ? cls[gap] : null,
// 					{
// 						[cls.wrap]: wrap,
// 						[cls.max]: max,
// 					},
// 					className)}
// 				{...otherProps}
// 			>
// 				{children}
// 			</TagName>
// 		)
// 	}