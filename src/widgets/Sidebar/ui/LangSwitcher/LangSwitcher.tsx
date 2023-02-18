import { useTranslate } from 'features/LanguageSwitcher'
import { FC } from 'react'
import { Button } from 'shared/ui/Button/Button'

export const LangSwitcher: FC = ({ children }) => {
	const { setLang, t, currentLang } = useTranslate()
	const onToggleLang = () => {
		setLang(currentLang === 'en' ? 'ru' : 'en')
	}
	return (
		<Button
			onClick={onToggleLang}
			variant='backgroundInverted'
		>
			{children === 'button lang change' ? t('button lang change') : t('button lang short')}
		</Button>
	)
}
