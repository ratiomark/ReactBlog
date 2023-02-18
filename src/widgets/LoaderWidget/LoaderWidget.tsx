import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Loader } from 'shared/ui/Loader/Loader';
import cls from "./LoaderWidget.module.scss"

interface LoaderWidgetProps {
	className?: string;
}

export const LoaderWidget = ({ className }: LoaderWidgetProps) => {
	return (
		<div className={classNames(cls.LoaderWidget, {}, [className])} >
			<Loader/>
		</div>
	)
}