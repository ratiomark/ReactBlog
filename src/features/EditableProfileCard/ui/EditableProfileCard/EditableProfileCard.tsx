import clsx from 'clsx'
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { getUserAuthData } from '@/entities/User';
import { getInputErrorsState } from '../../model/selectors/getInputErrors';
import { getInputErrorsData } from '../../model/selectors/getInputErrorsData';
import { getProfileError } from '../../model/selectors/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly';
import { fetchProfileData } from '../../model/services/fetchProfileData';
import { updateProfileData } from '../../model/services/updateProfileData';
import { profileReducer, profileActions } from '../../model/slice/profileSlice';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { validateAge } from '@/shared/lib/helpers/validation/validateAge';
import { validateFirstName } from '@/shared/lib/helpers/validation/validateFirstName';
import { validateLastName } from '@/shared/lib/helpers/validation/validateLastName';
import { EditableProfileCardButtons } from '../EditableProfileCardButtons/EditableProfileCardButtons';
import { inputData } from '@/entities/Profile';
import cls from './EditableProfileCard.module.scss'
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { ToggleFeatures } from '@/shared/lib/features';
import { ProfileCardRedesigned } from '@/entities/Profile';
import { EditableProfileCardButtonsRedesigned } from '../EditableProfileCardButtons/EditableProfileCardButtonsRedesigned';
import { useTranslation } from 'react-i18next';

// export type ProfileKeys =
// 	| 'firstname'
// 	| 'lastname'
// 	| 'age'
// 	| 'city'
// 	| 'username'
// 	| 'avatar'

// type OnValidate1 = (value: string) => void
// type OnValidate2 = (inputValue: number) => void

// export interface inputData {
// 	name: ProfileKeys
// 	type?: string
// 	inputErrors?: ValidationErrorText[]
// 	onValidate?: OnValidate1 | OnValidate2
// 	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
// }

const onKeyPressInputAge = (event: KeyboardEvent<HTMLInputElement>) => {
	if (isNaN(Number(event.key)) && event.key !== 'Backspace' && event.key !== 'Tab') {
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
	const { t } = useTranslation('profile')
	const { dispatch } = useAsyncReducer({ reducers: reducers, removeAfterUnmount: false })
	const { id: profileId } = useParams<{ id: string }>()
	const authData = useSelector(getUserAuthData)
	const canEdit = profileId === authData?.id
	const profileForm = useSelector(getProfileForm)
	const profileError = useSelector(getProfileError)
	const profileIsLoading = useSelector(getProfileIsLoading)
	const profileReadonly = useSelector(getProfileReadonly)
	const profileHasInputErrors = useSelector(getInputErrorsState)
	const profileInputErrorsData = useSelector(getInputErrorsData)

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			profileId && dispatch(fetchProfileData(profileId))
		}
	}, [dispatch, profileId])


	const onValidateFirstName = useCallback((inputValue: string) => {
		const errors = validateFirstName(inputValue)
		dispatch(profileActions.setInputErrors({ 'firstname': errors }))
		dispatch(profileActions.checkInputErrors())
	}, [dispatch])

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		console.log(profileHasInputErrors)
		const { value, name } = e.target
		dispatch(profileActions.updateProfileForm({ [name]: value }))
	}, [dispatch, profileHasInputErrors])

	const onValidateLastName = useCallback((inputValue: string) => {
		const errors = validateLastName(inputValue)
		dispatch(profileActions.setInputErrors({ 'lastname': errors }))
		dispatch(profileActions.checkInputErrors())
	}, [dispatch])

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
				onValidate: onValidateFirstName,
				inputErrors: profileInputErrorsData?.firstname,
				label: t('input label first name')
			},
			{
				name: 'lastname',
				onValidate: onValidateLastName,
				inputErrors: profileInputErrorsData?.lastname,
				label: t('input label last name')
			},
			{
				name: 'age',
				onValidate: onValidateAge,
				onKeyPress: onKeyPressInputAge,
				inputErrors: profileInputErrorsData?.age,
				label: t('input label age')
			},
			{
				name: 'city',
				label: t('input label city')
			},
			{
				name: 'username',
				// onValidate: onValidateAge,
				// onKeyPress: onKeyPressInputAge,
				inputErrors: profileInputErrorsData?.username,
				label: t('input label user')
			},
			{
				name: 'avatar',
				label: t('input label avatar')
			},
		]
	}, [onValidateFirstName, t, onValidateLastName, onValidateAge, profileInputErrorsData])

	const onEditProfile = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])

	const onSaveProfile = useCallback(() => {
		if (profileHasInputErrors || !profileId) {
			return
		}
		dispatch(profileActions.setReadonly(true))
		dispatch(updateProfileData(profileId))
	}, [dispatch, profileHasInputErrors, profileId])

	const onCancelProfileChanges = useCallback(() => {
		dispatch(profileActions.cancelEditProfileData())
	}, [dispatch])

	// if (profileIsLoading) {
	// 	return <Loader />
	// }

	const ProfileEditButtons = (
		<EditableProfileCardButtons
			canEdit={canEdit}
			readonly={profileReadonly}
			hasInputErrors={profileHasInputErrors}
			onEditProfile={onEditProfile}
			onSaveProfile={onSaveProfile}
			onCancelProfileChanges={onCancelProfileChanges}
		/>)
	const ProfileEditButtonsRedesigned = (
		<EditableProfileCardButtonsRedesigned
			canEdit={canEdit}
			readonly={profileReadonly}
			hasInputErrors={profileHasInputErrors}
			onEditProfile={onEditProfile}
			onSaveProfile={onSaveProfile}
			onCancelProfileChanges={onCancelProfileChanges}
		/>)

	return (
		<div className={clsx(cls.EditableProfileCard, [className])} >
			<ToggleFeatures
				name='isAppRedesigned'
				off={
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
						canEdit={canEdit}
						onEditProfile={onEditProfile}
						onSaveProfile={onSaveProfile}
						onCancelProfileChanges={onCancelProfileChanges}
						ProfileEditButtons={ProfileEditButtons}
					/>
				}
				on={<ProfileCardRedesigned
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
					canEdit={canEdit}
					onEditProfile={onEditProfile}
					onSaveProfile={onSaveProfile}
					onCancelProfileChanges={onCancelProfileChanges}
					ProfileEditButtons={ProfileEditButtonsRedesigned}
				/>}
			/>
		</div>
	)
}