import clsx from 'clsx'
import { useTranslation } from 'react-i18next';
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation()
	return (
		<div className={clsx(cls.ProfilePage, [className])} >
			{t('PROFILE PAGE')}
		</div>

	)
}
export default ProfilePage