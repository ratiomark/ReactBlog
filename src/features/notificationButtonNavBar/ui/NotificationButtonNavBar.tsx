import clsx from 'clsx'
import { NotificationList } from '@/entities/Notification';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import cls from './NotificationButtonNavBar.module.scss'
import NotificationIconDeprecated from '@/shared/assets/icon/bell.svg'
import NotificationIcon from '@/shared/assets/icons_redesigned/notification.svg'

import { useMobile } from '@/shared/lib/helpers/hooks/useMobile';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { useState } from 'react';
import { AnimationProvider } from '@/shared/lib/helpers/providersAndComponents/AnimationProvider';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popup';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Popover } from '@/shared/ui/redesigned/Popup';


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
		<ToggleFeatures name='isAppRedesigned'
			off={
				<ButtonDeprecated onClick={onOpenDrawer} variant='clear'>
					<IconDeprecated Svg={NotificationIconDeprecated} inverted />
				</ButtonDeprecated>
			}
			on={
				<Icon clickable Svg={NotificationIcon} onClick={onOpenDrawer} />
			}
		/>

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
		<ToggleFeatures name='isAppRedesigned'
			off={
				<PopoverDeprecated
					className={className}
					listDirection='bottom_left'
					trigger={trigger}
				>
					<NotificationList className={cls.notifications} />
				</PopoverDeprecated>
			}

			on={
				<Popover
					className={className}
					listDirection='bottom_left'
					trigger={trigger}
				>
					<NotificationList className={cls.notifications} />
				</Popover>
			}
		/>

	)
}