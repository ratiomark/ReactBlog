import { getUserAuthData } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button';
import styles from "./NavBar.module.scss"
import { userActions } from 'entities/User'

interface NavBarProps {
	className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
	const { t } = useTranslation();
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
			<div className={classNames(styles.navBar, {}, [className])} >
				
				<div className={styles.links} >
					<Button
						onClick={onLogout}
						variant='background'
						size='size_m'
					>
						{t('log out')}
					</Button>
				</div>

				<LoginModal
					isOpen={isAuthOpen}
					onClose={onClose}
				/>

			</div>
		)
	} else {
		return (
			<div className={classNames(styles.navBar, {}, [className])} >
				<div className={styles.links} >
					<Button
						onClick={onShowModal}
						variant='background'
						size='size_m'
					>
						{t('log in')}
					</Button>
				</div>

				<LoginModal
					isOpen={isAuthOpen}
					onClose={onClose}
				/>
			</div>
		)
	}

}
