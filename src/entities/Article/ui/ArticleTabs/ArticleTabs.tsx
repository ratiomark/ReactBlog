import clsx from 'clsx';
import { type } from 'os';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import cls from './ArticleTabs.module.scss';

interface ArticleTabsProps {
	className?: string
	value: string
	onArticleTabClick: (tab: TabItem) => void
}

export const ArticleTabs = memo((props: ArticleTabsProps) => {
	const {
		className,
		value,
		onArticleTabClick
	} = props

	const { t } = useTranslation()

	const typeTabs = useMemo<TabItem[]>(() => [
		{
			value: 'ALL',
			content: 'all'
		},
		{
			value: 'IT',
			content: 'IT'
		},
		{
			value: 'ECONOMICS',
			content: 'economics'
		},
		{
			value: 'SCIENCE',
			content: 'science'
		},
	], [])

	return (
		<div className={clsx(
			cls.ArticleTabs,
			[className])}
		>
			<Tabs
				tabs={typeTabs}
				value={value}
				onTabClick={onArticleTabClick}
			/>
		</div>
	)
})
ArticleTabs.displayName = 'ArticleTabs'