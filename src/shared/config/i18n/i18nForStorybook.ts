import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
	.use(Backend)
	.use(LanguageDetector)
	.init({
		react: {
			useSuspense: false //   <---- this will do the magic
		},
		fallbackLng: 'ru',
		// дебаг будет спамить в консоль подрузку переводов, отсутсвующие ключи
		debug: __IS_DEV__,
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		}
	});
export default i18n;