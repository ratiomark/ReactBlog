import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Popover.module.scss';
import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';

interface PopoverProps {
	className?: string
	trigger: ReactNode
	listDirection?: AbsoluteListDirection
	children?: ReactNode
}

export function Popover(props: PopoverProps) {
	const {
		className,
		trigger,
		listDirection = 'bottom_right',
		children,
	} = props

	return (
		<HPopover className={clsx(
			cls.Popover,
			[className])}>

			<HPopover.Button as={'div'} className={cls.trigger}>
				{trigger}
			</HPopover.Button>

			<HPopover.Panel className={clsx(cls.menuPopover, listDirection)}>
				{children}
			</HPopover.Panel>
		</HPopover>
	)
}