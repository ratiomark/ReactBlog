import i18next from 'i18next'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ValidationErrorText, ValidationFunctionNumber } from './validationErrorTexts'

export const validateAge: ValidationFunctionNumber = (inputValue) => {
	const errors: string[] = []
	if (!inputValue) {
		console.log('ПУСТОй ИНПУТ')
		return [ValidationErrorText.MANDATORY_INPUT]
	}
	if (inputValue > 120) {
		errors.push(ValidationErrorText.STOP_LYING_ABOUT_AGE)
	}
	return errors
}

