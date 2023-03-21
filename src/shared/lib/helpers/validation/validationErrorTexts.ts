import i18next from 'i18next';

export const ValidationErrorText = {
	MANDATORY_INPUT: i18next.t('inputs.MANDATORY_INPUT'),
	HAS_TO_BE_MORE_THAN_3: i18next.t('inputs.HAS_TO_BE_MORE_THAN_3'),
	STOP_LYING_ABOUT_AGE: i18next.t('inputs.STOP_LYING_ABOUT_AGE'),
} as const

export interface InputErrorData {
	[key: string]: ValidationErrorText[];
}

export type ValidationErrorText = keyof typeof ValidationErrorText

export type ValidationFunctionText = (inputValue: string) => string[]
export type ValidationFunctionNumber = (inputValue: number) => string[]