import clsx from 'clsx'
import { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';

import { ChangeEvent, KeyboardEvent, ReactNode, } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidationErrorText } from '@/shared/lib/helpers/validation/validationErrorTexts';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';

import { Text } from '@/shared/ui/deprecated/Text/Text';
import cls from './ProfileCard.module.scss'

// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { Profile } from '@/features/EditableProfileCard';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Card } from '@/shared/ui/redesigned/Card/Card';

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
	label?: string
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

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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
	let profileContentLeft;
	let profileContentRight;
	if (inputData && canEdit) {
		profileContentLeft = <>
			{inputData.slice(0, 4).map(item => <Input
				value={String(profileForm![item.name])}
				name={String(item['name'])}
				key={String(item['name'])}
				onChangeEvent={onChangeHandler}
				onValidate={item['onValidate']}
				onKeyPress={item.onKeyPress}
				readonly={readonly}
				inputErrors={item['inputErrors']}
				type={item['type']}
				// className={cls.input}
				label={item?.label}
			/>)}
		</>
		profileContentRight = <>
			{inputData.slice(4).map(item => <Input
				value={String(profileForm![item.name])}
				name={String(item['name'])}
				key={String(item['name'])}
				onChangeEvent={onChangeHandler}
				onValidate={item['onValidate']}
				onKeyPress={item.onKeyPress}
				readonly={readonly}
				inputErrors={item['inputErrors']}
				type={item['type']}
				// className={cls.input}
				label={item?.label}
			/>)}
		</>
	} else {
		profileContentLeft = <>
			{inputTemplate.slice(0, 4).map((item) => <Input
				value={String(profileForm![item])}
				key={item}
				readonly={true}
			// className={cls.input}
			/>)}
		</>
		profileContentRight = <>
			{inputTemplate.slice(4).map((item) => <Input
				value={String(profileForm![item])}
				key={item}
				readonly={true}
			// className={cls.input}
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
		<Card
			padding='24'
			className={cls.card}
		>
			<VStack max gap='gap_32' justify='center' align='center' className={clsx(cls.ProfileCard, [className])} >
				<Avatar size={128} src={profileForm.avatar} />
				<HStack>
					{ProfileEditButtons}
				</HStack>
				<HStack max gap='gap_20' justify='center' align='start'>
					<VStack
						// max
						className={cls.data}
						justify='start'
						align='left'
						gap='gap_16'
					>
						{profileContentLeft}
					</VStack>
					<VStack
						// max
						className={cls.data}
						justify='start'
						align='left'
						gap='gap_16'
					>
						{profileContentRight}

						{currencyAndCountry}
					</VStack>
				</HStack>

			</VStack >
		</Card>
	)
}
