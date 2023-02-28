import AboutIcon from 'shared/assets/icon/order.svg'
import MainIcon from 'shared/assets/icon/main.svg'
import MainIconCopy from 'shared/assets/icon/main.svg'
import { RoutePath } from 'app/providers/router/config/routeConfig/routeConfig'

export interface SideBarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SideBarItemType[] = [
	{
		path: RoutePath.MAIN,
		text: 'main page',
		Icon: MainIcon,
	},
	{
		path: RoutePath.ABOUT,
		text: 'About us',
		Icon: AboutIcon,
	},
	{
		path: RoutePath.profile,
		text: 'PROFILE PAGE',
		Icon: MainIconCopy,
	},
]