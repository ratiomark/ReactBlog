import { useState, useEffect } from 'react'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from '../Button/Button'

interface BugButtonProps {
	className?: string
}

export const BugButton = ({ className }: BugButtonProps) => {
	
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
		<div className={classNames('', {}, [className])}>
			<Button onClick={throwError}>Кнопка</Button>
		</div>
	)
}
