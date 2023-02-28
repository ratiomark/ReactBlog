import { useTranslate } from 'features/LanguageSwitcher'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { useMemo, useState } from 'react'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import cls from './Sidebar.module.scss'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'app/providers/router/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icon/order.svg'
import MainIcon from 'shared/assets/icon/main.svg'
import { useTranslation } from 'react-i18next'
import { SidebarItemsList } from 'widgets/Sidebar/model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
	className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
	const { t, currentLang } = useTranslate();

	const [collapsed, setCollapsed] = useState(false)
	
	const onToggle = () => {
		setCollapsed((prev) => !prev)
	}

	const SideBarItemsRendered = useMemo(() => SidebarItemsList.map(item => (
		<SidebarItem item={item} collapsed={collapsed} key={item.path} />
		// eslint-disable-next-line
	)), [collapsed, currentLang])
	
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
				{/* <div className={cls.item}>
					<AppLink
						className={cls.item}
						theme={AppLinkTheme.inverted}
						to={RoutePath.MAIN}
					>
						<MainIcon className={cls.icon} />
						<span className={cls.link}>{t('Main')}</span>
					</AppLink>
				</div>
				<div className={cls.item}>
					<AppLink
						className={cls.item}
						theme={AppLinkTheme.inverted}
						to={RoutePath.ABOUT}
					>
						<AboutIcon className={cls.icon} />
						<span className={cls.link}>{t('About us')}</span>
					</AppLink>
				</div> */}
			</nav>
			<div className={classNames(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
				<ThemeSwitcher />
				<LangSwitcher>{collapsed ? 'button lang short' : 'button lang change'}</LangSwitcher>
			</div>
		</div>
	)
}
