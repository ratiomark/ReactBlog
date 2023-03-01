import { useTranslation } from 'react-i18next';

export const Langs = {
	en: 'en',
	ru: 'ru'
} as const;

export type Langs = keyof typeof Langs;

export const useCustomTranslate = () => {
	const { t, i18n } = useTranslation()
	const setLang = (lang: Langs) => i18n.changeLanguage(lang)
	const currentLang = i18n.language
	return { setLang, t , currentLang}
}