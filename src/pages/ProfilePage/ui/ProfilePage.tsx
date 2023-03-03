import clsx from 'clsx'
import { fetchProfileData, profileReducer } from 'entities/Profile';
import { ProfileCard } from 'entities/Profile/ui/ProfileCard/ProfileCard';
import { useEffect } from 'react';
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
	useEffect(() => {
		const result = dispatch(fetchProfileData())
	}, [dispatch])

	return (
		<div className={clsx(cls.ProfilePage, [className])} >
			{t('PROFILE PAGE')}
			<ProfileCard />
		</div>

	)
}
export default ProfilePage