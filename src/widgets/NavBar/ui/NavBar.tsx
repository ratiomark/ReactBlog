import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/helpers/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import { userActions } from '@/entities/User'
import cls from './NavBar.module.scss'
import { Dropdown } from '@/shared/ui/Popup/ui/Dropdown/Dropdown'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import NotificationIcon from '@/shared/assets/icon/notification-new.svg'
import { HStack } from '@/shared/ui/Stack'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Popover } from '@/shared/ui/Popup'
import { NotificationList } from '@/entities/Notification'
import { NotificationButtonNavBar } from '@/features/notificationButtonNavBar'
import { AvatarDropDownNavBar } from '@/features/avatarDropDownNavBar'

interface NavBarProps {
	className?: string
}

export const NavBar = memo(({ className }: NavBarProps) => {
	const { t } = useTranslation()
	const [isAuthOpen, setIsAuthOpen] = useState(false)
	const userAuthData = useSelector(getUserAuthData)


	const onClose = useCallback(() => {
		setIsAuthOpen(false)
	}, [])
	const onShowModal = useCallback(() => {
		setIsAuthOpen(true)
	}, [])

	// const onLogout = () => {
	// 	dispatch(userActions.logout())
	// }

	if (userAuthData) {
		return (
			<header className={classNames(cls.navBar, {}, [className])}>
				<HStack gap='gap_16' justify='end' className={cls.links}>
					<NotificationButtonNavBar />
					<AvatarDropDownNavBar />
				</HStack>
			</header>
		)
	} else {
		return (
			<header className={classNames(cls.navBar, {}, [className])}>
				<div className={cls.links}>
					<Button onClick={onShowModal} variant='background' size='size_m'>
						{t('log in')}
					</Button>
				</div>

				{isAuthOpen && <LoginModal isOpen={isAuthOpen} onClose={onClose} />}
			</header>
		)
	}
})
NavBar.displayName = 'NavBar'