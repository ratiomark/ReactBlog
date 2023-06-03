import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/shared/ui/deprecated/Button/Button'
import { userActions } from '@/entities/User'
import cls from './NavBar.module.scss'
import { Icon } from '@/shared/ui/deprecated/Icon/Icon'
import { NotificationList } from '@/entities/Notification'
import { NotificationButtonNavBar } from '@/features/notificationButtonNavBar'
import { AvatarDropDownNavBar } from '@/features/avatarDropDownNavBar'
import clsx from 'clsx'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/deprecated/Stack'

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



	if (userAuthData) {
		return (
			<ToggleFeatures
				name='isAppRedesigned'
				off={
					<header className={clsx(cls.navBar, className)}>
						<HStack gap='gap_16' justify='end' className={cls.links}>
							<NotificationButtonNavBar />
							<AvatarDropDownNavBar />
						</HStack>
					</header>
				}
				on={
					<header className={clsx(cls.navBar_redesigned, className)}>
						<HStack gap='gap_16' justify='end' className={cls.links}>
							<NotificationButtonNavBar />
							<AvatarDropDownNavBar />
						</HStack>
					</header>
				}
			/>

		)
	} else {
		return (
			<header className={clsx(cls.navBar, className)}>
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