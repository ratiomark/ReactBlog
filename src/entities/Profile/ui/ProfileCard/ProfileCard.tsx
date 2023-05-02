import clsx from 'clsx'
import { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Profile } from '@/features/EditableProfileCard';
import { ChangeEvent, KeyboardEvent, ReactNode, } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidationErrorText } from '@/shared/lib/helpers/validation/validationErrorTexts';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader/Loader';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { Text } from '@/shared/ui/Text/Text';
import cls from './ProfileCard.module.scss'

export type ProfileKeys =
	| 'firstname'
	| 'lastname'
	| 'age'
	| 'city'
	| 'username'
	| 'avatar'

type OnValidate1 = (value: string) => void
type OnValidate2 = (inputValue: number) => void

export interface inputData {
	name: ProfileKeys
	type?: string
	inputErrors?: ValidationErrorText[]
	onValidate?: OnValidate1 | OnValidate2
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

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
	ProfileEditButtons: ReactNode
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
		readonly = true,
		canEdit,
		inputData,
		ProfileEditButtons
	} = props
	const { t } = useTranslation('profile')

	if (profileIsLoading || !profileForm) {
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

	console.log(profileForm)
	let profileContent
	if (inputData && canEdit) {
		profileContent = <>
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
		</>
	} else {
		profileContent = <>
			{inputTemplate.map((item) => <Input
				value={String(profileForm![item])}
				key={item}
				readonly={true}
				className={cls.input}
			/>)}
		</>
	}

	const currencyAndCountry = (<>
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
	</>)

	return (
		<div className={clsx(cls.ProfileCard, [className])} >
			<Text title={t('Шапка профиля')} />
			{ProfileEditButtons}
			<VStack className={cls.data}
				justify='center'
				align='left'
				gap='gap_10'
			>
				{profileContent}
				{currencyAndCountry}
			</VStack>
		</div >
	)
}
// import clsx from 'clsx'
// import { Country } from 'entities/Country';
// import { CountrySelect } from 'entities/Country/ui/CountrySelect/CountrySelect';
// import { Currency, CurrencySelect } from 'entities/Currency';
// import { Profile } from 'features/EditableProfileCard';
// import { inputData, ProfileKeys } from 'features/EditableProfileCard/ui/EditableProfileCard';
// import { ChangeEvent, } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
// import { Input } from 'shared/ui/Input/Input';
// import { Loader } from 'shared/ui/Loader/Loader';
// import { VStack } from 'shared/ui/Stack/VStack/VStack';
// import { Text } from 'shared/ui/Text/Text';
// import cls from './ProfileCard.module.scss'


// interface ProfileCardProps {
// 	className?: string
// 	profileForm?: Profile
// 	profileError?: string
// 	profileIsLoading?: boolean
// 	readonly?: boolean
// 	canEdit?: boolean
// 	hasInputErrors?: boolean
// 	onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void
// 	onChangeCurrency?: (value: Currency) => void
// 	onChangeCountry?: (value: Country) => void
// 	currencyValue?: string
// 	countryValue?: string
// 	onEditProfile?: () => void
// 	onSaveProfile?: () => void
// 	onCancelProfileChanges?: () => void
// 	inputData?: inputData[]
// }

// const inputTemplate: ProfileKeys[] = [
// 	'firstname', 'lastname', 'age', 'city', 'username', 'avatar'
// ]

// export const ProfileCard = (props: ProfileCardProps) => {
// 	const {
// 		className,
// 		profileForm,
// 		profileError,
// 		profileIsLoading,
// 		onChangeHandler,
// 		onChangeCurrency,
// 		onChangeCountry,
// 		currencyValue,
// 		countryValue,
// 		hasInputErrors,
// 		onEditProfile,
// 		onSaveProfile,
// 		onCancelProfileChanges,
// 		readonly = true,
// 		canEdit,
// 		inputData,
// 	} = props
// 	const { t } = useTranslation('profile')

// 	if (profileIsLoading) {
// 		return (
// 			<div className={clsx(cls.ProfileCard, cls.isLoading, [className])} >
// 				<Loader />
// 			</div>
// 		)
// 	}

// 	if (profileError) {
// 		return (
// 			<div className={clsx(cls.ProfileCard, [className])} >
// 				<Text variant='error' title='Произошла ошибка на стороне сервера' />
// 			</div>
// 		)
// 	}

// 	let profileContent
// 	if (inputData && canEdit) {
// 		profileContent = <>
// 			{inputData.map(item => <Input
// 				value={String(profileForm![item.name])}
// 				name={String(item['name'])}
// 				key={String(item['name'])}
// 				onChangeEvent={onChangeHandler}
// 				onValidate={item['onValidate']}
// 				onKeyPress={item.onKeyPress}
// 				readonly={readonly}
// 				inputErrors={item['inputErrors']}
// 				type={item['type']}
// 				className={cls.input}
// 			/>)}
// 		</>
// 	} else {
// 		profileContent = <>
// 			{inputTemplate.map((item) => <Input
// 				value={String(profileForm![item])}
// 				key={item}
// 				readonly={true}
// 				className={cls.input}
// 			/>)}
// 		</>
// 	}

// 	const currencyAndCountry = (<>
// 		<CurrencySelect
// 			onChange={onChangeCurrency}
// 			value={currencyValue}
// 			readonly={readonly}
// 		/>
// 		<CountrySelect
// 			onChange={onChangeCountry}
// 			value={countryValue}
// 			readonly={readonly}
// 		/></>)

// 	return (
// 		<div className={clsx(cls.ProfileCard, [className])} >
// 			<Text title={t('Шапка профиля')} />
// 			<div className={cls.buttons}>
// 				{!canEdit
// 					? null
// 					:
// 					<Button
// 						size={ButtonSize.size_m}
// 						variant={ButtonVariant.backgroundInverted_border}
// 						disabled={hasInputErrors}
// 						onClick={readonly ? onEditProfile : onSaveProfile}
// 					>
// 						{readonly ? t('edit') : t('save profile')}
// 					</Button>}
// 				{readonly
// 					? null
// 					:
// 					<Button
// 						size='size_m'
// 						variant='outline_red'
// 						onClick={onCancelProfileChanges}
// 					>
// 						{t('cancel changes in profile')}
// 					</Button>
// 				}
// 			</div>
// 			<VStack className={cls.data}
// 				justify='center'
// 				align='left'
// 				gap='gap_10'
// 			>
// 				{profileContent}
// 				{currencyAndCountry}
// 			</VStack>
// 		</div >
// 	)
// }