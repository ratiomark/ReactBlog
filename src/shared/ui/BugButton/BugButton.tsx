// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { useCustomTranslate } from '@/features/LanguageSwitcher'
import { useState, useEffect } from 'react'
import { classNames } from '@/shared/lib/helpers/classNames/classNames'
import { Button } from '../Button/Button'

interface BugButtonProps {
	className?: string
}

export const BugButton = ({ className }: BugButtonProps) => {
	const { t } = useCustomTranslate()
	const [error, setError] = useState(false)

	useEffect(() => {
		if (error) {
			throw new Error()
		}
	}, [error])

	const throwError = () => {
		setError(true)
	}

	return (
		<Button onClick={throwError}>{t('error button')}</Button>
	)
}
