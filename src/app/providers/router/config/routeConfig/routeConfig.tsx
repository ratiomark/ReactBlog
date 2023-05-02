import { AboutPage } from '@/pages/AboutPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RouteProps } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean
	wrapper?: React.ElementType
	roles?: UserRole[]
}

export const AppRoutes = {
	MAIN: 'main',
	ABOUT: 'about',
	profile: 'profile',
	articles: 'articles',
	articles_details: 'articles_details',
	admin_panel: 'admin_panel',
	forbidden_page: 'forbidden_page',
	PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
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
// export const RoutePath: Record<AppRoutes, string> = {
// 	MAIN: '/',
// 	ABOUT: '/about',
// 	profile: '/profile/', // + :id
// 	articles: '/articles',
// 	articles_details: '/articles/', // + :id
// 	PAGE_NOT_FOUND: '*'
// }
export const obtainRouteMain = () => '/'
export const obtainRouteAbout = () => '/about'
export const obtainRouteProfile = (id: string | number) => `/profile/${id}`
export const obtainRouteArticles = () => '/articles'
export const obtainRouteArticlesDetails = (id: string | number) => `/articles/${id}`
export const obtainRouteAdminPanel = () => '/admin'
export const obtainForbiddenPage = () => '/forbidden'


export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	MAIN: {
		path: obtainRouteMain(),
		element: <MainPage />,
		wrapper: Page
	},
	ABOUT: {
		path: obtainRouteAbout(),
		element: <AboutPage />,
		wrapper: Page
	},
	profile: {
		path: obtainRouteProfile(':id'),
		element: <ProfilePage />,
		authOnly: true,
		wrapper: Page
	},
	articles: {
		path: obtainRouteArticles(),
		element: <ArticlesPage />,
		authOnly: true
	},
	articles_details: {
		path: obtainRouteArticlesDetails(':id'),
		element: <ArticleDetailsPage />,
		authOnly: true,
		wrapper: Page
	},
	admin_panel: {
		path: obtainRouteAdminPanel(),
		element: <AdminPanelPage />,
		authOnly: true,
		wrapper: Page,
		roles: ['ADMIN', 'MANAGER']
	},

	forbidden_page: {
		path: obtainForbiddenPage(),
		element: <ForbiddenPage />
	},

	PAGE_NOT_FOUND: {
		path: '*',
		element: <span data-testid='PageNotFound'>No Page Here!</span>
	}
}