import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ArticlesPageSearchPanel } from '../ArticlesPageSearchPanel/ArticlesPageSearchPanel';
import { ArticlesPageSortPanel } from '../ArticlesPageSortPanel/ArticlesPageSortPanel';
import { ArticlesPageTabsPanel } from '../ArticlesPageTabsPanel/ArticlesPageTabsPanel';
import { ArticlesPageViewPanel } from '../ArticlesPageViewPanel/ArticlesPageViewPanel';
import cls from './ArticlesPageFiltersWidget.module.scss';

interface ArticlesPageFiltersWidgetProps {
	className?: string
}



export const ArticlesPageFiltersWidget = (props: ArticlesPageFiltersWidgetProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.articlesPageFiltersWidget,
			[className])}
		>
			<div className={cls.sortWrapper}>
				<ArticlesPageSortPanel />
				<ArticlesPageViewPanel />
			</div>
			<ArticlesPageSearchPanel
				className={cls.search}
			/>
			<ArticlesPageTabsPanel
				className={cls.tabs}
			/>
		</div>
	)
}



