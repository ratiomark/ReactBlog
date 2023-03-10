import { useCustomTranslate } from 'features/LanguageSwitcher'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import cls from './Sidebar.module.scss'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import { SidebarItemsList } from '../../model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useTranslation } from 'react-i18next'

interface SidebarProps {
	className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	// const { t, currentLang } = useCustomTranslate();
	const { t, i18n } = useTranslation()
	const [collapsed, setCollapsed] = useState(false)

	const onToggle = () => {
		setCollapsed((prev) => !prev)
	}

	const SideBarItemsRendered = SidebarItemsList.map(item => (
		<SidebarItem
			item={item}
			collapsed={collapsed}
			key={item.path}
		/>
		// eslint-disable-next-line
	))
	// const SideBarItemsRendered = useMemo(() => SidebarItemsList.map(item => (
	// 	<SidebarItem
	// 		item={item}
	// 		collapsed={collapsed}
	// 		key={item.path}
	// 	/>
	// 	// eslint-disable-next-line
	// )), [collapsed, currentLang])

	return (
		<div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>

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
		</div>
	)
})