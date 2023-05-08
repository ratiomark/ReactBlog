import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames'
import { Loader } from '@/shared/ui/Loader/Loader';
import { Page } from '@/widgets/Page';
import cls from './LoaderWidget.module.scss'

interface LoaderWidgetProps {
	className?: string;
}

export const LoaderWidget = memo((props: LoaderWidgetProps) => {
	return (
		<Page>
			<div className={classNames(cls.LoaderWidget, {}, [props.className])} >
				<Loader />
			</div>
		</Page>
	)
})
LoaderWidget.displayName = 'LoaderWidget'