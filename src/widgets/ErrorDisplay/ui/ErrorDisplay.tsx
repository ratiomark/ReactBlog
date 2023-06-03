import { useCustomTranslate } from '@/features/LanguageSwitcher'
import { Button } from '@/shared/ui/deprecated/Button/Button'
import clsx from 'clsx'
import cls from './ErrorDisplay.module.scss'

interface ErrorDisplayProps {
	className?: string
}

export const ErrorDisplay = ({ className }: ErrorDisplayProps) => {
	const { t } = useCustomTranslate()
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<div className={clsx(cls.ErrorDisplay, [className])}>
			<h2>{t('error happened')}</h2>
			<Button
				variant='outline'
				onClick={reloadPage}>
				{t('update page')}
			</Button>
		</div>
	)
}
