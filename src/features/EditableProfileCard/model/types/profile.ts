import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { InputErrorData } from 'shared/lib/helpers/validation/validationErrorTexts'

export interface Profile {
	firstname?: string
	lastname?: string
	username?: string
	age?: number
	currency?: Currency
	country?: Country
	city?: string
	avatar?: string
}
// type ProfileKeys = keyof Profile
// const q: ProfileKeys = {

// }
// то что будет хранится в стейте
export interface ProfileSchema {
	data?: Profile
	form?: Profile
	readonly: boolean
	isLoading: boolean
	error?: string
	inputErrors: boolean
	inputErrorsData?: InputErrorData
}