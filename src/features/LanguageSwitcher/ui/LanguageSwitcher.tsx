import { useTranslation } from 'react-i18next';

export const langs = {
	en: 'en',
	ru: 'ru'
} as const;

export type langs = keyof typeof langs;

export const useTranslate = () => {
	const { t, i18n } = useTranslation()
	const setLang = (lang: langs) => i18n.changeLanguage(lang)
	const currentLang = i18n.language
	return { setLang, t , currentLang}
}