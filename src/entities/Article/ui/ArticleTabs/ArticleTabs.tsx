import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs/Tabs';
import cls from './ArticleTabs.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs/Tabs';

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
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<TabsDeprecated
					tabs={typeTabs}
					value={value}
					onTabClick={onArticleTabClick}
					className={className}
				/>
			}
			on={
				<Tabs
					direction='column'
					align='start'
					tabs={typeTabs}
					value={value}
					onTabClick={onArticleTabClick}
					className={className}
				/>
			}
		/>
	)
})
ArticleTabs.displayName = 'ArticleTabs'