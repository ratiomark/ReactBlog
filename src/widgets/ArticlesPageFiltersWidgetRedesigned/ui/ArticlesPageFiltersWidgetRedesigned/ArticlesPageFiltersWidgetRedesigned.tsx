import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ArticlesPageSearchPanel } from '../ArticlesPageSearchPanel/ArticlesPageSearchPanel';
import { ArticlesPageSortPanel } from '../ArticlesPageSortPanel/ArticlesPageSortPanel';
import { ArticlesPageTabsPanel } from '../ArticlesPageTabsPanel/ArticlesPageTabsPanel';
import { ArticlesPageViewPanel } from '../ArticlesPageViewPanel/ArticlesPageViewPanel';
import cls from './ArticlesPageFiltersWidget.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticlesPageFiltersWidgetProps {
	className?: string
}



export const ArticlesPageFiltersWidgetRedesigned = (props: ArticlesPageFiltersWidgetProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()
	return (
		<Card padding='24' className={clsx(cls.articlesPageFiltersWidget, className)}>

			{/* // cls.articlesPageFiltersWidget, */}
			<VStack gap='gap_16' align='start' justify='start'>
				<ArticlesPageSearchPanel />
				<ArticlesPageTabsPanel />
				<ArticlesPageSortPanel />
				{/* <div className={cls.sortWrapper}> */}
				{/* <div className={cls.search}></div> */}

				{/* <div	className={cls.tabs}></div> */}

			</VStack>
		</Card>)

}



