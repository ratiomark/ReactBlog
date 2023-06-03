import AboutIconDeprecated from '@/shared/assets/icon/about-20-20.svg'
import MainIconDeprecated from '@/shared/assets/icon/main-20-20.svg'
import ProfileIconDeprecated from '@/shared/assets/icon/profile-20-20.svg'
import ArticleIconDeprecated from '@/shared/assets/icon/article-20-20.svg'
import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { SideBarItemType } from '../types/items'
import { obtainRouteAbout, obtainRouteArticles, obtainRouteMain, obtainRouteProfile } from '@/app/providers/router/config/routeConfig/routeConfig'

import MainIcon from '@/shared/assets/icons_redesigned/home.svg';
import ArticleIcon from '@/shared/assets/icons_redesigned/article.svg';
import AboutIcon from '@/shared/assets/icons_redesigned/Info.svg';
import ProfileIcon from '@/shared/assets/icons_redesigned/avatar.svg';
import { toggleFeatures } from '@/shared/lib/features'

// createSelector принимает массив(или просто набор селекторов через запятую) селекторов и функцию преобразования. Если передаю массив, то каждое вычисленное значение селектора будет доступно в аргументах функции по порядку в котором были указаны в массиве
export const getSidebarItems = createSelector(
	[getUserAuthData],
	(userData) => {
		const sidebarItemsList: SideBarItemType[] = [
			{
				path: obtainRouteMain(),
				text: 'main page',
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => MainIconDeprecated,
					on: () => MainIcon,
				}),
			},
			{
				path: obtainRouteAbout(),
				text: 'About us',
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => AboutIconDeprecated,
					on: () => AboutIcon,
				}),
			},
		]
		// ссылки только для авторизованных пользователей
		if (userData) {
			sidebarItemsList.push(
				{
					path: obtainRouteProfile(userData.id),
					text: 'PROFILE PAGE',
					Icon: toggleFeatures({
						name: 'isAppRedesigned',
						off: () => ProfileIconDeprecated,
						on: () => ProfileIcon,
					}),
				},
				{
					path: obtainRouteArticles(),
					text: 'ARTICLES',
					Icon: toggleFeatures({
						name: 'isAppRedesigned',
						off: () => ArticleIconDeprecated,
						on: () => ArticleIcon,
					}),
				},
			)
		}
		return sidebarItemsList
	}
)

