import { lazy } from 'react';

export const ArticlesPageLazy = lazy(() => import('./ArticlesPage'))
// export const AboutPageLazy = lazy(() => new Promise((resolve) => {
// 	// @ts-ignore
// 	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
// 	setTimeout(() => resolve(import('./AboutPage')), 1500);
// }));