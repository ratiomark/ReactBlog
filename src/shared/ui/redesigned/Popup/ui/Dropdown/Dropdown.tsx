import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react'
import cls from './Dropdown.module.scss';
import { Fragment, ReactNode } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';



export interface DropdownItem {
	disabled?: boolean
	content?: ReactNode
	href?: string
	onClick?: () => void

}

interface DropdownProps {
	className?: string
	trigger: ReactNode
	items: DropdownItem[]
	listDirection?: AbsoluteListDirection
}


export const Dropdown = (props: DropdownProps) => {
	const {
		className,
		trigger,
		items,
		listDirection = 'bottom_right',
	} = props

	return (
		<Menu
			as='div'
			className={clsx(
				cls.Dropdown,
				[className])}
		>
			<Menu.Button className={cls.trigger}>
				{trigger}
			</Menu.Button>

			<Menu.Items className={clsx(cls.menu, listDirection)}>

				{items.map((item, index) => {
					const content = ({ active }: { active: boolean }) => (
						<li
							className={clsx(
								cls.menuItem,
								{ [cls.active]: active },
								{ [cls.disabled]: item.disabled },
							)}
							onClick={item.onClick}
						>
							{item.content}
						</li>
					)

					if (item.href) {
						return (<Menu.Item as={AppLink} key={index} to={item.href} disabled={item.disabled}>
							{content}
						</Menu.Item>)
					}

					return (
						<Menu.Item key={index} as={Fragment}>
							{content}
						</Menu.Item>
					)
				})}

			</Menu.Items>
		</Menu >
	)
}

