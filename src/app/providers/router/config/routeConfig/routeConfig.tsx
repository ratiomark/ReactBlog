import { AboutPage } from 'pages/AboutPage';
import { MainPage} from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';


export const AppRoutes = {
	MAIN: 'main',
	ABOUT: 'about',
	profile: 'profile'
} as const;

// В варианте ниже я получаю type AppRoutes = "MAIN" | "ABOUT"
export type AppRoutes = keyof typeof AppRoutes;
// В варианте ниже, я получу Type '{ readonly MAIN: "main"; readonly ABOUT: "about"; }'
// export type AppRoutes = typeof AppRoutes; 
export const RoutePath: Record<AppRoutes, string> = {
	MAIN: '/',
	ABOUT: '/about',
	profile: '/profile'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	MAIN: {
		path: RoutePath.MAIN,
		element: <MainPage />
	},
	ABOUT: {
		path: RoutePath.ABOUT,
		element: <AboutPage/>
	},
	profile: {
		path: RoutePath.profile,
		element: <ProfilePage/>
	}
}