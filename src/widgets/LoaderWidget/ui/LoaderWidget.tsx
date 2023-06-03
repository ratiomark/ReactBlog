import { memo } from 'react';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Page } from '@/widgets/Page';
import cls from './LoaderWidget.module.scss'
import clsx from 'clsx';

interface LoaderWidgetProps {
	className?: string;
}

export const LoaderWidget = memo((props: LoaderWidgetProps) => {
	return (
		<Page>
			<div className={clsx(cls.LoaderWidget, [props.className])} >
				<Loader />
			</div>
		</Page>
	)
})
LoaderWidget.displayName = 'LoaderWidget'