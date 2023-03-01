import clsx from 'clsx'
import { profileReducer } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
	className?: string;
}

const reducers: ReducersList = {
	profile: profileReducer
}

const ProfilePage = (props: ProfilePageProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation()
	const { store, dispatch } = useAsyncReducer({ reducers: reducers, removeAfterUnmount: true })
	return (
		<div className={clsx(cls.ProfilePage, [className])} >
			{t('PROFILE PAGE')}
		</div>

	)
}
export default ProfilePage