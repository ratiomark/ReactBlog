import { useCustomTranslate } from '@/features/LanguageSwitcher'
import { Langs } from '@/features/LanguageSwitcher'
import { ReactNode } from 'react'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button'
import { ToggleFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button/Button'

interface LangSwitcherProps {
	className?: string
	short?: boolean
}

export const LangSwitcher = (props: LangSwitcherProps) => {
	const {
		className,
		short
	} = props
	const { setLang, t, currentLang } = useCustomTranslate()


	const onToggleLang = () => {
		setLang(currentLang === Langs.en ? Langs.ru : Langs.en)
	}

	return (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<ButtonDeprecated
					onClick={onToggleLang}
					variant='backgroundInverted'
					className={className}
				>
					{short ? t('button lang short') : t('button lang change')}
				</ButtonDeprecated>
			}

			on={
				<Button
					variant='clear'
					onClick={onToggleLang}
				>
					{short ? t('button lang short') : t('button lang change')}
				</Button>
			}
		/>

	)
}