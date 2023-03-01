import { Country, Currency } from 'shared/const/common'

export interface Profile {
	first: string
	lastname: string
	age: number
	currency: Currency
	country: Country
	city: string
	username: string
	avatar: string
}

// то что будет хранится в стейте
export interface ProfileSchema {
	data?: Profile
	readonly: boolean
	isLoading: boolean
	error?: string
}