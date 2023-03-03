import clsx from 'clsx'
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading';
import { useCustomTranslate } from 'features/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation('profile')
	const profileData = useSelector(getProfileData)
	const profileError = useSelector(getProfileError)
	const profileIsLoading = useSelector(getProfileIsLoading)
	return (
		<div className={clsx(cls.ProfileCard, [className])} >
			<Text title={t('Шапка профиля')} />
			<Button
				size={ButtonSize.size_l}
				variant={ButtonVariant.background}
			>
				{t('profile')}
			</Button>
			<div className={cls.data}>
				<Input
					value={profileData?.first}
					placeholder={t('edit')}
				/>
			</div>
		</div>
	)
}