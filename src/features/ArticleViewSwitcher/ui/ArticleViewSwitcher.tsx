import clsx from 'clsx';
import { ArticleListView } from '@/entities/Article';
import cls from './ArticleViewSwitcher.module.scss'
import ListIconDeprecated from '@/shared/assets/icon/list-24-24.svg';
import GridIconDeprecated from '@/shared/assets/icon/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons_redesigned/burger.svg';
import GridIcon from '@/shared/assets/icons_redesigned/tile.svg';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';


interface ArticleViewSwitcherProps {
	className?: string;
	view: ArticleListView
	onViewClick?: (view: ArticleListView) => void
}

const viewTypes: { view: ArticleListView, icon: React.VFC<React.SVGProps<SVGSVGElement>> }[] = [
	{
		view: 'grid',
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			off: () => GridIconDeprecated,
			on: () => GridIcon
		})
	},
	{
		view: 'list',
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			off: () => ListIconDeprecated,
			on: () => ListIcon
		})
	}
]

export const ArticleViewSwitcher = (props: ArticleViewSwitcherProps) => {
	const {
		className,
		view,
		onViewClick
	} = props

	//что-то типа замыкания. Тут функция принимает аргумент и возвращает коллбек внутри которого вызывается пропсовая функция с переданным аргументом
	const onClick = (newView: ArticleListView) => () => {
		onViewClick?.(newView)
	}

	return (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<div className={className}>
					{
						viewTypes.map(viewType => (
							<Button
								key={viewType.view}
								variant='clear'
								// в onClick попадает ()=>{onViewClick?.(viewType.view)}
								onClick={onClick(viewType.view)}>
								<IconDeprecated
									width={24}
									height={24}
									Svg={viewType.icon}
									className={clsx(
										cls.icon,
										{ [cls.notSelected]: viewType.view !== view }
									)}
								/>
							</Button>
						))
					}
				</ div >
			}
			on={
				<Card
					horizontal
					padding='0'
					className={clsx(
						cls.card,
						// { [cls.selectedView]: viewType.view !== view },
						className
					)}
				>
					{
						viewTypes.map(viewType => (
							<div
								className={clsx(
									// cls.icon,
									cls.iconWrapper,
									{ [cls.selected]: viewType.view === view }
								)}
								key={viewType.view}
							>
								<Icon
									className={clsx(
										{ [cls.notSelected]: viewType.view !== view }
									)}
									clickable
									onClick={onClick(viewType.view)}

									// width={24}
									// height={24}
									Svg={viewType.icon}
								/>
							</div>
						))
					}
				</ Card >
			}
		/>
	)
}