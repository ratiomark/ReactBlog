import clsx from 'clsx'
// import { fetchProfileData, profileReducer } from 'entities/Profile';
import { ProfileCard } from 'entities/Profile/ui/ProfileCard/ProfileCard';
import { EditableProfileCard } from 'features/EditableProfileCard/ui/EditableProfileCard';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
	className?: string;
}



const ProfilePage = (props: ProfilePageProps) => {
	const {
		className,
	} = props

	return (
		<div className={clsx(cls.ProfilePage, [className])} >
			{t('PROFILE PAGE')}
			<EditableProfileCard />
		</div>

	)
}
export default ProfilePage