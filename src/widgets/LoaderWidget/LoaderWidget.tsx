import { memo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Loader } from 'shared/ui/Loader/Loader';
import cls from './LoaderWidget.module.scss'

interface LoaderWidgetProps {
	className?: string;
}

export const LoaderWidget = memo((props: LoaderWidgetProps) => {
	return (
		<div className="page-wrapper">
			<div className={classNames(cls.LoaderWidget, {}, [props.className])} >
				<Loader />
			</div>
		</div>
	)
})
LoaderWidget.displayName = 'LoaderWidget'