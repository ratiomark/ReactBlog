import clsx from 'clsx';
import { memo, ReactNode, useCallback } from 'react';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { Flex, FlexAlign, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
	value: string
	content: ReactNode
}

interface TabsProps {
	className?: string
	tabs: TabItem[]
	value: string
	onTabClick: (tab: TabItem) => void
	direction?: FlexDirection
	align?: FlexAlign
}

export const Tabs = memo((props: TabsProps) => {
	const {
		className,
		tabs,
		value,
		onTabClick,
		direction = 'row',
		align = 'center',
	} = props

	// VAR: Замыкание! 
	const clickHandle = useCallback((tab: TabItem) => () => {
		onTabClick(tab)
	}, [onTabClick])

	return (
		<Flex
			align={align}
			direction={direction}
			gap='gap_8'
			className={clsx(
				cls.Tabs,
				[className])}
		>
			{tabs.map(item => {
				const isSelected = value === item.value
				return (
					<Card
						key={item.value}
						variant={isSelected ? 'light' : 'normal'}
						className={clsx(
							cls.tabItem,
							{ [cls.selectedItem]: isSelected }
						)}
						onClick={clickHandle(item)}
					>
						{item.content}
					</Card>
				)
			})}
		</Flex>
	)
})
