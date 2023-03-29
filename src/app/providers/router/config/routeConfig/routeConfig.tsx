import { AboutPage } from 'pages/AboutPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean
	wrapper?: React.ElementType
}

export const AppRoutes = {
	MAIN: 'main',
	ABOUT: 'about',
	profile: 'profile',
	articles: 'articles',
	articles_details: 'articles_details',
	PAGE_NOT_FOUND: 'PAGE_NOT_FOUND'
} as const;

// export type AppRoutes =
// 	| 'MAIN'
// 	| 'ABOUT'
// 	| 'profile'
// 	| 'articles'
// 	| 'articles_details'
// 	| 'PAGE_NOT_FOUND'
// В варианте ниже я получаю type AppRoutes = "MAIN" | "ABOUT"
export type AppRoutes = keyof typeof AppRoutes;
// В варианте ниже, я получу Type '{ readonly MAIN: "main"; readonly ABOUT: "about"; }'
// export type AppRoutes = typeof AppRoutes; 
export const RoutePath: Record<AppRoutes, string> = {
	MAIN: '/',
	ABOUT: '/about',
	profile: '/profile/', // + :id
	articles: '/articles',
	articles_details: '/articles/', // + :id
	PAGE_NOT_FOUND: '*'
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	MAIN: {
		path: RoutePath.MAIN,
		element: <MainPage />,
		wrapper: Page
	},
	ABOUT: {
		path: RoutePath.ABOUT,
		element: <AboutPage />,
		wrapper: Page
	},
	profile: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true,
		wrapper: Page
	},
	articles: {
		path: RoutePath.articles,
		element: <ArticlesPage />,
		authOnly: true
	},
	articles_details: {
		path: RoutePath.articles_details + ':id',
		element: <ArticleDetailsPage />,
		authOnly: true,
		wrapper: Page
	},
	PAGE_NOT_FOUND: {
		path: RoutePath.PAGE_NOT_FOUND,
		element: <span>No Page Here!</span>
	}
}