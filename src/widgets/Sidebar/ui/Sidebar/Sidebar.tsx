import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { memo, useMemo, useState } from 'react'
import { Button } from '@/shared/ui/deprecated/Button/Button'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import clsx from 'clsx'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { VStack } from '@/shared/ui/deprecated/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon/Icon'
import ArrowIcon from '@/shared/assets/icons_redesigned/arrow-bottom.svg';
import cls from './Sidebar.module.scss'


interface SidebarProps {
	className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false)
	const sidebarItemsList = useSelector(getSidebarItems)

	const onToggle = () => {
		setCollapsed((prev) => !prev)
	}

	const SideBarItemsRendered = useMemo(() => {
		return sidebarItemsList.map(item => (
			<SidebarItem
				item={item}
				collapsed={collapsed}
				key={item.path}
			/>
		))
	}, [sidebarItemsList, collapsed])


	return (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<menu
					data-testid='sidebar'
					className={clsx(
						cls.Sidebar,
						{ [cls.collapsed]: collapsed },
						className)}
				>
					<Button
						data-testid='toggle-sidebar'
						variant='backgroundInverted'
						className={cls.collapseBtn}
						size='size_l'
						square
						onClick={onToggle}>
						{collapsed ? '>' : '<'}
					</Button>

					<VStack as={'nav'} gap="gap_8" align='start' className={cls.items}>
						{SideBarItemsRendered}
					</VStack>

					<div className={clsx(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
						<ThemeSwitcher />
						<LangSwitcher short={collapsed} className={cls.lang} />
					</div>
				</menu>}


			on={
				<menu
					data-testid='sidebar'
					className={clsx(
						cls.SidebarRedesigned,
						{ [cls.collapsedRedesigned]: collapsed },
						className)}
				>
					<AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />

					<VStack as='nav' gap="gap_8" className={cls.items}>
						{SideBarItemsRendered}
					</VStack>

					<Icon
						data-testid="sidebar-toggle"
						onClick={onToggle}
						className={cls.collapseBtn}
						Svg={ArrowIcon}
						clickable
					/>

					<div className={clsx(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
						<ThemeSwitcher />
						<LangSwitcher short={collapsed} className={cls.lang} />
					</div>
				</menu>
			}
		/>

	)
})
Sidebar.displayName = 'Sidebar'