import { getUserAuthData } from 'entities/User'
import { LoginModal } from 'features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import { userActions } from 'entities/User'
import cls from './NavBar.module.scss'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { RoutePath } from 'app/providers/router/config/routeConfig/routeConfig'

interface NavBarProps {
	className?: string
}

export const NavBar = memo(({ className }: NavBarProps) => {
	const { t } = useTranslation()
	const [isAuthOpen, setIsAuthOpen] = useState(false)
	const userAuthData = useSelector(getUserAuthData)
	const dispatch = useDispatch()

	const onClose = useCallback(() => {
		setIsAuthOpen(false)
	}, [])
	const onShowModal = useCallback(() => {
		setIsAuthOpen(true)
	}, [])

	const onLogout = () => {
		dispatch(userActions.logout())
	}

	if (userAuthData) {
		return (
			<header className={classNames(cls.navBar, {}, [className])}>
				<Dropdown
					className={cls.links}
					trigger={<Avatar size={30} src={userAuthData.avatar} />}
					listDirection='bottom_left'
					items={[

						{
							content: t('PROFILE'),
							href: RoutePath.profile + userAuthData.id
						},
						{
							content: t('log out'),
							onClick: onLogout
						},
						// <Button onClick={onLogout} variant='background' size='size_m'>
						// 	{t('log out')}
						// </Button>

					]}
				/>
				{/* <div className={cls.links}>
					<Button onClick={onLogout} variant='background' size='size_m'>
						{t('log out')}
					</Button>
				</div> */}

				<LoginModal isOpen={isAuthOpen} onClose={onClose} />
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