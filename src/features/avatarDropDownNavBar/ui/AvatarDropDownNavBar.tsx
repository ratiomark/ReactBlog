import clsx from "clsx"
import cls from "./AvatarDropDownNavBar.module.scss"
import { Dropdown } from "@/shared/ui/Popup";
import { RoutePath } from "@/app/providers/router/config/routeConfig/routeConfig";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { getUserAuthData, userActions } from "@/entities/User";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface NotificationButtonNavBarProps {
	className?: string;
}

export const AvatarDropDownNavBar = (props: NotificationButtonNavBarProps) => {
	const {
		className,
	} = props
	const userAuthData = useSelector(getUserAuthData)
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const onLogout = () => {
		dispatch(userActions.logout())
	}

	if (!userAuthData) return null

	return (
		<Dropdown
			className={clsx(cls.AvatarDropDownNavBar, [className])}
			trigger={<Avatar size={30} src={userAuthData.avatar} />}
			listDirection='bottom_left'
			items={[
				{
					content: t('PROFILE'),
					href: RoutePath.profile + userAuthData.id
				},
				{
					content: t('log out'),
					onClick: onLogout
				},
			]}
		/>
	)
}
