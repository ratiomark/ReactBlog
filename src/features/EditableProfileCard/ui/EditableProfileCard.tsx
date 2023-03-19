import clsx from 'clsx'
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ReducersList, useAsyncReducer } from 'shared/lib/helpers/hooks/useAsyncReducer';
import { validateAge } from 'shared/lib/helpers/validation/validateAge';
import { validateFirstName } from 'shared/lib/helpers/validation/validateFirstName';
import { validateLastName } from 'shared/lib/helpers/validation/validateLastName';
import { InputErrorData, ValidationErrorText } from 'shared/lib/helpers/validation/validationErrorTexts';
import { getInputErrorsState } from '../model/selectors/getInputErrors';
import { getInputErrorsData } from '../model/selectors/getInputErrorsData';
import { getProfileError } from '../model/selectors/getProfileError';
import { getProfileForm } from '../model/selectors/getProfileForm';
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly';
import { fetchProfileData } from '../model/services/fetchProfileData';
import { updateProfileData } from '../model/services/updateProfileData';
import { profileActions, profileReducer } from '../model/slice/profileSlice';
import { Profile } from '../model/types/profile';
import cls from './EditableProfileCard.module.scss'

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
const onKeyPressInputAge = (event: KeyboardEvent<HTMLInputElement>) => {
	if (isNaN(Number(event.key)) && event.key !== 'Backspace') {
		event.preventDefault();
	}
}

interface EditableProfileCardProps {
	className?: string;
}

const reducers: ReducersList = {
	profile: profileReducer
}
export const EditableProfileCard = (props: EditableProfileCardProps) => {
	const {
		className,
	} = props
	// const { t } = useTranslation()
	const { dispatch } = useAsyncReducer({ reducers: reducers, removeAfterUnmount: false })
	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchProfileData())
		}
	}, [dispatch])

	const profileForm = useSelector(getProfileForm)
	const profileError = useSelector(getProfileError)
	const profileIsLoading = useSelector(getProfileIsLoading)
	const profileReadonly = useSelector(getProfileReadonly)
	const profileHasInputErrors = useSelector(getInputErrorsState)
	const profileInputErrorsData = useSelector(getInputErrorsData)


	const onValidateFirstname = useCallback((inputValue: string) => {
		const errors = validateFirstName(inputValue)
		dispatch(profileActions.setInputErrors({ 'firstname': errors }))
		dispatch(profileActions.checkInputErrors())
	}, [dispatch])

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		console.log(profileHasInputErrors)
		const { value, name } = e.target
		dispatch(profileActions.updateProfileForm({ [name]: value }))
	}, [dispatch, profileHasInputErrors])

	const onValidateLastname = useCallback((inputValue: string) => {
		const errors = validateLastName(inputValue)
		dispatch(profileActions.setInputErrors({ 'lastname': errors }))
		dispatch(profileActions.checkInputErrors())
	}, [dispatch])

	const onChangeAge = useCallback(() => {

	}, [])

	const onChangeCurrency = useCallback((value: Currency) => {
		dispatch(profileActions.updateProfileForm({ currency: value }))
	}, [dispatch])

	const onChangeCountry = useCallback((value: Country) => {
		dispatch(profileActions.updateProfileForm({ country: value }))
	}, [dispatch])

	const onValidateAge = useCallback((inputValue: number) => {
		const errors = validateAge(Number(inputValue))
		dispatch(profileActions.setInputErrors({ 'age': errors }))
		dispatch(profileActions.checkInputErrors())
	}, [dispatch])


	// onChange: onChangeAge
	const inputData = useMemo<inputData[]>(() => {
		return [
			{
				name: 'firstname',
				onValidate: onValidateFirstname,
				inputErrors: profileInputErrorsData?.firstname
			},
			{
				name: 'lastname',
				onValidate: onValidateLastname,
				inputErrors: profileInputErrorsData?.lastname
			},
			{
				name: 'age',
				onValidate: onValidateAge,
				onKeyPress: onKeyPressInputAge,
				inputErrors: profileInputErrorsData?.age
			},
			{
				name: 'city',
			},
			{
				name: 'username',
				// onValidate: onValidateAge,
				// onKeyPress: onKeyPressInputAge,
				inputErrors: profileInputErrorsData?.username
			},
			{
				name: 'avatar',
			},
		]
	}, [onValidateFirstname, onValidateLastname, onValidateAge, profileInputErrorsData])

	const onEditProfile = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])

	const onSaveProfile = useCallback(() => {
		if (profileHasInputErrors) {
			return
		}
		dispatch(profileActions.setReadonly(true))
		dispatch(updateProfileData())
	}, [dispatch, profileHasInputErrors])

	const onCancelProfileChanges = useCallback(() => {
		dispatch(profileActions.cancelEditProfileData())
	}, [dispatch])

	return (
		<div className={clsx(cls.EditableProfileCard, [className])} >
			<ProfileCard
				profileForm={profileForm}
				profileError={profileError}
				profileIsLoading={profileIsLoading}
				inputData={inputData}
				hasInputErrors={profileHasInputErrors}
				onChangeHandler={onChangeHandler}
				onChangeCurrency={onChangeCurrency}
				currencyValue={profileForm?.currency}
				onChangeCountry={onChangeCountry}
				countryValue={profileForm?.country}
				readonly={profileReadonly}
				onEditProfile={onEditProfile}
				onSaveProfile={onSaveProfile}
				onCancelProfileChanges={onCancelProfileChanges}
			/>
		</div>
	)
}