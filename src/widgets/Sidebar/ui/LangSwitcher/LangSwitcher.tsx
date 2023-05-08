import { useCustomTranslate } from '@/features/LanguageSwitcher'
import { Langs } from '@/features/LanguageSwitcher'
import { ReactNode } from 'react'
import { Button } from '@/shared/ui/Button/Button'

export const LangSwitcher = ({ children }: { children: ReactNode }) => {
	const { setLang, t, currentLang } = useCustomTranslate()
	const onToggleLang = () => {
		setLang(currentLang === Langs.en ? Langs.ru : Langs.en)
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