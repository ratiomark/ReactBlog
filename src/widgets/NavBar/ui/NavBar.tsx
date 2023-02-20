import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import styles from "./NavBar.module.scss"

interface NavBarProps {
	className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
	const { t } = useTranslation();
	const [isAuthOpen, setIsAuthOpen] = useState(false)
	const onToggleModal = useCallback(() => {
		setIsAuthOpen(prev => !prev)
	}, [])

	return (
		<div className={classNames(styles.navBar, {}, [className])} >

			{/* <Button onClick={() => setIsOpen(true)}>{t('log in')}</Button> */}
			<div
				// onClick={() => setIsOpen(true)}
				className={styles.links} >
				<Button
					onClick={onToggleModal}
					variant='background'
					size='size_m'
				>
					{t('log in')}
				</Button>
			</div>
			<Modal
				isOpen={isAuthOpen}
				onClose={onToggleModal}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, accusantium enim incidunt laboriosam ullam assumenda numquam blanditiis voluptatum non consequatur quaerat consequuntur, repellat, aperiam distinctio dolorem ad reprehenderit illo vitae!
			</Modal>

		</div>
	)
}
