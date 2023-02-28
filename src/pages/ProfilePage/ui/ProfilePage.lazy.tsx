import { lazy } from 'react';

// export const MainPageLazy = lazy(() => import('./MainPage'))
export const ProfilePageLazy = lazy(() => new Promise((resolve) => {
	// @ts-ignore
	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
	setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));