import AboutIcon from '@/shared/assets/icon/order.svg'
import MainIcon from '@/shared/assets/icon/main.svg'
import MainIconCopy from '@/shared/assets/icon/main.svg'
import ProfileIcon from '@/shared/assets/icon/profile.svg'
import BookIcon from '@/shared/assets/icon/book.svg'
import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { SideBarItemType } from '../types/items'
import { obtainRouteAbout, obtainRouteArticles, obtainRouteMain, obtainRouteProfile } from '@/app/providers/router/config/routeConfig/routeConfig'
// createSelector принимает массив(или просто набор селекторов через запятую) селекторов и функцию преобразования. Если передаю массив, то каждое вычисленное значение селектора будет доступно в аргументах функции по порядку в котором были указаны в массиве
export const getSidebarItems = createSelector(
	[getUserAuthData],
	(userData) => {
		const sidebarItemsList: SideBarItemType[] = [
			{
				path: obtainRouteMain(),
				text: 'main page',
				Icon: MainIcon,
			},
			{
				path: obtainRouteAbout(),
				text: 'About us',
				Icon: AboutIcon,
			},
		]
		// ссылки только для авторизованных пользователей
		if (userData) {
			sidebarItemsList.push(
				{
					path: obtainRouteProfile(userData.id),
					text: 'PROFILE PAGE',
					Icon: ProfileIcon,
				},
				{
					path: obtainRouteArticles(),
					text: 'ARTICLES',
					Icon: BookIcon,
				},
			)
		}
		return sidebarItemsList
	}
)

