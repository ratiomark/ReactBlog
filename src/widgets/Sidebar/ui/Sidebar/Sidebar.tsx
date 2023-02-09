import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button';
import cls from "./Sidebar.module.scss"

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false)
	const onToggle = () => { setCollapsed(prev => !prev) }
	return (
		<div
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<Button className={classNames(cls.toggleSidebar, { [cls.toggleSidebar_collapsed]: collapsed })} onClick={onToggle}>toggle</Button>
			<div className={classNames(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
				<ThemeSwitcher />
			</div>
		</div>
	)
}