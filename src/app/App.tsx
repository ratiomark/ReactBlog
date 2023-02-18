import { Suspense, useContext, useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import './styles/index.scss'
import { useTheme } from './providers/ThemeProvider/lib/useTheme'
import { AppRouter } from './providers/router/AppRouter'
import { NavBar } from 'widgets/NavBar'
import { Sidebar } from 'widgets/Sidebar'
import icon from 'shared/assets/icon/abyss.jpg'
import icon2 from 'shared/assets/icon/768px-Sign-check-icon.png'
import { useTranslation } from 'react-i18next'
import { LoaderWidget } from 'widgets/LoaderWidget/LoaderWidget'



export const App = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback={<LoaderWidget />}>
				<NavBar />
				<div className='content-page'>
					<Sidebar />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	)
}
