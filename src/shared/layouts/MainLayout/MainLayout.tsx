import clsx from 'clsx'
import cls from './MainLayout.module.scss'
import { ReactElement, } from 'react';

interface MainLayoutProps {
	className?: string;
	header: ReactElement
	content: ReactElement
	sidebar: ReactElement
	toolbar?: ReactElement
}

export const MainLayout = (props: MainLayoutProps) => {
	const {
		className,
		header,
		content,
		sidebar,
		toolbar
	} = props

	return (
		<div className={clsx(cls.MainLayout, [className])} >

			<div className={cls.sidebar}>{sidebar}</div>
			<div className={cls.content}>{content}</div>
			<div className={cls.rightbar}>
				<div className={cls.header}>{header}</div>
				<div className={cls.toolbar}>{toolbar}</div>
			</div>
		</div>
	)
}