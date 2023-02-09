import { AboutPage } from 'pages/AboutPage';
import { MainPage} from 'pages/MainPage';
import { RouteProps } from "react-router-dom";


export const AppRoutes = {
	MAIN: 'main',
	ABOUT: 'about',
} as const;

// В варианте ниже я получаю type AppRoutes = "MAIN" | "ABOUT"
export type AppRoutes = keyof typeof AppRoutes;
// В варианте ниже, я получу Type '{ readonly MAIN: "main"; readonly ABOUT: "about"; }'
// export type AppRoutes = typeof AppRoutes; 
export const RoutePath: Record<AppRoutes, string> = {
	MAIN: "/",
	ABOUT: "/about",
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	MAIN: {
		path: RoutePath.MAIN,
		element: <MainPage />
	},
	ABOUT: {
		path: RoutePath.ABOUT,
		element: <AboutPage/>
	}
}