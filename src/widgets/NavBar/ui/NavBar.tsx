import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import styles from "./NavBar.module.scss"

interface NavBarProps {
	className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
	return (
		<div className={classNames(styles.navBar, {}, [className])} >

			<div className={styles.links} >
				<AppLink theme={AppLinkTheme.secondary} to='/' >Главная </AppLink>
				<AppLink theme={AppLinkTheme.primary} to='/about'>About us </AppLink>
			</div>

		</div>
	)
}
