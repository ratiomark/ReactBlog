import { useTranslate } from 'features/LanguageSwitcher'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import cls from './ErrorDisplay.module.scss'

interface ErrorDisplayProps {
	className?: string
}

export const ErrorDisplay = ({ className }: ErrorDisplayProps) => {
	const { t } = useTranslate()
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<div className={classNames(cls.ErrorDisplay, {}, [className])}>
			<h2>{t('error happened')}</h2>
			<Button
				variant='outline'
				onClick={reloadPage}>
				{t('update page')}
			</Button>
		</div>
	)
}
