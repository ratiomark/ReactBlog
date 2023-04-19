import clsx from "clsx"
import { NotificationList } from "@/entities/Notification";
import { Button } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import cls from "./NotificationButtonNavBar.module.scss"
import NotificationIcon from '@/shared/assets/icon/notification-new.svg'
import { Popover } from "@/shared/ui/Popup";

interface NotificationButtonNavBarProps {
	className?: string;
}

export const NotificationButtonNavBar = (props: NotificationButtonNavBarProps) => {
	const {
		className,
	} = props

	return (
		<Popover
			className={className}
			listDirection='bottom_left'
			trigger={(
				<Button variant='clear'>
					<Icon Svg={NotificationIcon} inverted />
				</Button>
			)}
		>
			<NotificationList className={cls.notifications} />
		</Popover>
	)
}