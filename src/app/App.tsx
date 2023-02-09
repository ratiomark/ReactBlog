import { Suspense, useContext, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import './styles/index.scss'
import { useTheme } from './providers/ThemeProvider/lib/useTheme'
import { AppRouter } from './providers/router/AppRouter'
import { NavBar } from 'widgets/NavBar'
import { Sidebar } from 'widgets/Sidebar'
import icon from "shared/assets/icon/abyss.jpg"
import icon2 from "shared/assets/icon/768px-Sign-check-icon.png"
import { useTranslation } from 'react-i18next'
import { useTranslate } from 'features/LanguageSwitcher/ui/LanguageSwitcher'

const Component = () => {
	const { setLang, t, currentLang } = useTranslate();
	const onToggleLang = () => {
		setLang(currentLang === "en" ? 'ru' : 'en')
	}

	return (
		<div>
			<button onClick={onToggleLang}>{t('button lang change')}</button>
			{t('t1')}
		</div>
	)
}

export const App = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback=''>
				<NavBar />
				<Component />
				<div className='content-page'>
					<Sidebar />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	)
}
