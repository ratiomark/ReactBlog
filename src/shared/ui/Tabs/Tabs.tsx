import clsx from 'clsx';
import { memo, ReactNode, useCallback } from 'react';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
	value: string
	content: ReactNode
}

interface TabsProps {
	className?: string
	tabs: TabItem[]
	value: string
	onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
	const {
		className,
		tabs,
		value,
		onTabClick
	} = props

	// Замыкание! 
	const clickHandle = useCallback((tab: TabItem) => () => {
		onTabClick(tab)
	}, [onTabClick])

	return (
		<div className={clsx(
			cls.Tabs,
			[className])}
		>
			{tabs.map(item => (
				<Card
					key={item.value}
					variant={value === item.value ? 'outlined' : 'normal'}
					className={cls.tabItem}
					onClick={clickHandle(item)}
				>
					{item.content}
				</Card>
			)
			)}
		</div>
	)
})
