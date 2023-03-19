import i18next from 'i18next'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ValidationErrorText, ValidationFunctionText } from './validationErrorTexts'
export const validateLastName: ValidationFunctionText = (inputValue: string) => {
	const errors: string[] = []
	const inputValueLength = inputValue.length
	if (inputValueLength === 0) {
		return [ValidationErrorText.MANDATORY_INPUT]
	}
	if (inputValueLength < 3) {
		errors.push(ValidationErrorText.HAS_TO_BE_MORE_THAN_3)
	}
	return errors
}

