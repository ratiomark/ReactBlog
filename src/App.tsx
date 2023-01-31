import { Suspense, useContext, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy'
import { MainPageLazy } from './pages/MainPage/MainPage.lazy'
import { classNames } from './shared/lib/classNames/classNames'
import './styles/index.scss'
import { Theme, ThemeContext } from './theme/ThemeContext'
import { useTheme } from './theme/useTheme'


export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', { theme: true })}>

      {/* <div className={`app ${theme}`}> */}
      <button onClick={toggleTheme}>Toggle</button>
      <Link to='/'>Главная </Link>
      <Link to='/about'>About us </Link>
      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path='/about' element={<AboutPageLazy />} />
          <Route path='/' element={<MainPageLazy />} />
        </Routes>
      </Suspense>
    </div>
  )
}
