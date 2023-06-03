import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { SideBarItemType } from '../../model/types/items';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import clsx from 'clsx';
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
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<AppLinkDeprecated
					className={clsx(
						cls.item,
						{ [cls.collapsed]: collapsed },
					)}
					theme={AppLinkTheme.inverted}
					to={item.path}
				>
					<item.Icon className={cls.icon} />
					<span className={cls.link}>{t(item.text)}</span>
				</AppLinkDeprecated>
			}

			on={

				<AppLink
					className={clsx(
						cls.itemRedesigned,
						{ [cls.collapsedRedesigned]: collapsed }
					)}
					activeClassName={cls.active}
					additionalActiveClassName={collapsed ? cls.activeWhenCollapsed : ''}
					to={item.path}
				>
					<Icon Svg={item.Icon} />
					<span className={cls.link}>{t(item.text)}</span>
				</AppLink>
			}
		/>


	)
})
SidebarItem.displayName = 'SidebarItem'