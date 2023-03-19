import { memo } from 'react'
import { ValidationErrorText, ValidationFunctionText } from './validationErrorTexts'

export const validateFirstName: ValidationFunctionText = (inputValue: string) => {
	const errors: string[] = []
	const inputValueLength = inputValue.length
	if (inputValueLength === 0) return [ValidationErrorText.MANDATORY_INPUT]
	if (inputValueLength < 3) {
		errors.push(ValidationErrorText.HAS_TO_BE_MORE_THAN_3)
	}
	return errors
}