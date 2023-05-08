import clsx from 'clsx'
import cls from './AvatarDropDownNavBar.module.scss'
import { Dropdown } from '@/shared/ui/Popup';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { obtainRouteAdminPanel, obtainRouteProfile } from '@/app/providers/router/config/routeConfig/routeConfig';

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
	}



	if (!userAuthData) return null

	return (
		<Dropdown
			className={clsx(cls.AvatarDropDownNavBar, [className])}
			trigger={<Avatar size={30} src={userAuthData.avatar} />}
			listDirection='bottom_left'
			items={[
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
			]}
		/>
	)
}
