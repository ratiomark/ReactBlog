import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { memo, useMemo, useState } from 'react'
import { classNames } from '@/shared/lib/helpers/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import cls from './Sidebar.module.scss'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

interface SidebarProps {
	className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const { t, i18n } = useTranslation()
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
		<menu data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>

			<Button
				data-testid='toggle-sidebar'
				className={classNames(cls.toggleSidebar, { [cls.toggleSidebar_collapsed]: collapsed })}
				variant='backgroundInverted'
				square={true}
				size='size_xl'
				onClick={onToggle}>
				{collapsed ? '>' : '<'}
			</Button>

			<nav className={cls.items}>
				{SideBarItemsRendered}

			</nav>

			<div className={classNames(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
				<ThemeSwitcher />
				<LangSwitcher>{collapsed ? 'button lang short' : 'button lang change'}</LangSwitcher>
			</div>
		</menu>
	)
})
Sidebar.displayName = 'Sidebar'