import clsx from 'clsx'
import { NotificationList } from '@/entities/Notification';
import { Button } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './NotificationButtonNavBar.module.scss'
import NotificationIcon from '@/shared/assets/icon/bell.svg'
import { Popover } from '@/shared/ui/Popup';
import { useMobile } from '@/shared/lib/helpers/hooks/useMobile';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { useState } from 'react';
import { AnimationProvider } from '@/shared/lib/helpers/providersAndComponents/AnimationProvider';

interface NotificationButtonNavBarProps {
	className?: string;
}

export const NotificationButtonNavBar = (props: NotificationButtonNavBarProps) => {
	const {
		className,
	} = props
	const isMobile = useMobile()
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const onCloseDrawer = () => setIsDrawerOpen(false)
	const onOpenDrawer = () => setIsDrawerOpen(true)

	const trigger = (
		<Button onClick={onOpenDrawer} variant='clear'>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	)

	if (isMobile) {
		return (<>
			{trigger}
			<Drawer onClose={onCloseDrawer} isOpen={isDrawerOpen}>
				<NotificationList className={cls.notifications} />
			</Drawer>
		</>)
	}

	return (
		<Popover
			className={className}
			listDirection='bottom_left'
			trigger={trigger}
		>
			<NotificationList className={cls.notifications} />
		</Popover>
	)
}