import clsx from 'clsx'
import { Country } from 'entities/Country';
import { CountrySelect } from 'entities/Country/ui/CountrySelect/CountrySelect';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Profile } from 'features/EditableProfileCard';
import { inputData, ProfileKeys } from 'features/EditableProfileCard/ui/EditableProfileCard';
import { ChangeEvent, } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss'


interface ProfileCardProps {
	className?: string
	profileForm?: Profile
	profileError?: string
	profileIsLoading?: boolean
	readonly?: boolean
	canEdit?: boolean
	hasInputErrors?: boolean
	onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void
	onChangeCurrency?: (value: Currency) => void
	onChangeCountry?: (value: Country) => void
	currencyValue?: string
	countryValue?: string
	onEditProfile?: () => void
	onSaveProfile?: () => void
	onCancelProfileChanges?: () => void
	inputData?: inputData[]
	// {
	// 	name: ProfileKeys
	// 	inputErrors?: string[]
	// 	type?: string
	// 	onChange?: (v: string) => void,
	// 	onValidate?: (v: string) => string[]
	// }[]
}

const inputTemplate: ProfileKeys[] = [
	'firstname', 'lastname', 'age', 'city', 'username', 'avatar'
]

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
		profileForm,
		profileError,
		profileIsLoading,
		onChangeHandler,
		onChangeCurrency,
		onChangeCountry,
		currencyValue,
		countryValue,
		hasInputErrors,
		onEditProfile,
		onSaveProfile,
		onCancelProfileChanges,
		readonly = true,
		canEdit,
		inputData,
	} = props
	const { t } = useTranslation('profile')
	// useEffect(() => {
	// 	console.log(profileData)

	// }, [])
	if (profileIsLoading) {
		return (
			<div className={clsx(cls.ProfileCard, cls.isLoading, [className])} >
				<Loader />
			</div>
		)
	}

	if (profileError) {
		return (
			<div className={clsx(cls.ProfileCard, [className])} >
				<Text variant='error' title='Произошла ошибка на стороне сервера' />
			</div>
		)
	}
	let profileContent
	if (inputData && canEdit) {
		profileContent = <>
			<div className={cls.inputsWrapper}>
				{inputData.map(item => <Input
					value={String(profileForm![item.name])}
					name={String(item['name'])}
					key={String(item['name'])}
					onChangeEvent={onChangeHandler}
					onValidate={item['onValidate']}
					onKeyPress={item.onKeyPress}
					readonly={readonly}
					inputErrors={item['inputErrors']}
					type={item['type']}
					className={cls.input}
				/>)}
			</div>
			<CurrencySelect
				onChange={onChangeCurrency}
				value={currencyValue}
				readonly={readonly}
			/>
			<CountrySelect
				onChange={onChangeCountry}
				value={countryValue}
				readonly={readonly}
			/>
		</>
	} else {
		profileContent = <>
			<div className={cls.inputsWrapper}>
				{inputTemplate.map((item) => <Input
					value={String(profileForm![item])}
					key={item}
					readonly={true}
					className={cls.input}
				/>)}
			</div>
			<CurrencySelect
				onChange={onChangeCurrency}
				value={currencyValue}
				readonly={readonly}
			/>
			<CountrySelect
				onChange={onChangeCountry}
				value={countryValue}
				readonly={readonly}
			/>
		</>
	}

	return (
		<div className={clsx(cls.ProfileCard, [className])} >
			<Text title={t('Шапка профиля')} />
			<div className={cls.buttons}>
				{!canEdit
					? null
					:
					<Button
						size={ButtonSize.size_m}
						variant={ButtonVariant.backgroundInverted_border}
						disabled={hasInputErrors}
						onClick={readonly ? onEditProfile : onSaveProfile}
					>
						{readonly ? t('edit') : t('save profile')}
					</Button>}
				{readonly
					? null
					:
					<Button
						size='size_m'
						variant='outline_red'
						onClick={onCancelProfileChanges}
					>
						{t('cancel changes in profile')}
					</Button>
				}
			</div>
			<div className={cls.data}>
				{profileContent}
			</div>
		</div>
	)
}