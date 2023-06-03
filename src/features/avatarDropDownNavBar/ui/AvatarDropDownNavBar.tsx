import clsx from 'clsx'
import cls from './AvatarDropDownNavBar.module.scss'

import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { obtainRouteAdminPanel, obtainRouteProfile } from '@/app/providers/router/config/routeConfig/routeConfig';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popup';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popup';

interface NotificationButtonNavBarProps {
	className?: string;
}

export const AvatarDropDownNavBar = (props: NotificationButtonNavBarProps) => {
	const {
		className,
	} = props
	const userAuthData = useSelector(getUserAuthData)
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const isAdmin = useSelector(isUserAdmin)
	const isManager = useSelector(isUserManager)
	const isAdminPanelAvailable = isAdmin || isManager
	const onLogout = () => {
		dispatch(userActions.logout())
		window.location.reload()
	}

	if (!userAuthData) return null

	const avatarItems = [
		// развернул массив внутри которого объект
		...(isAdminPanelAvailable
			? [{ content: t('admin panel'), href: obtainRouteAdminPanel() }]
			: []
		),


		{
			content: t('PROFILE'),
			href: obtainRouteProfile(userAuthData.id)
		},
		{
			content: t('log out'),
			onClick: onLogout
		},
	]

	return (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<DropdownDeprecated
					className={clsx(cls.AvatarDropDownNavBar, [className])}
					trigger={<Avatar size={30} src={userAuthData.avatar} />}
					listDirection='bottom_left'
					items={avatarItems}
				/>
			}
			on={
				<Dropdown
					className={clsx(cls.AvatarDropDownNavBar, [className])}
					trigger={<Avatar size={40} src={userAuthData.avatar} />}
					listDirection='bottom_left'
					items={avatarItems}
				/>
			}
		/>

	)
}
