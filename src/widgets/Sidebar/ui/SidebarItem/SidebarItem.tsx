import { RoutePath } from 'app/providers/router/config/routeConfig/routeConfig';
import clsx from 'clsx'
import { t } from 'i18next';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SideBarItemType } from 'widgets/Sidebar/model/items';
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
	item: SideBarItemType,
	collapsed: boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const {
		item,
		collapsed
	} = props
	const { t, i18n } = useTranslation()
	return (
		<div className={cls.item}>
			<AppLink
				className={cls.item}
				theme={AppLinkTheme.inverted}
				to={item.path}
			>
				<item.Icon className={cls.icon} />
				<span className={collapsed ? cls.link_collapsed : cls.link}>{t(`${item.text}`)}</span>
			</AppLink>
		</div>
	)
})