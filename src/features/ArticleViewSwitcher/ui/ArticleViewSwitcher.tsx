import clsx from 'clsx';
import { ArticleListView } from 'entities/Article';
import cls from './ArticleViewSwitcher.module.scss'
import ListIcon from 'shared/assets/icon/list-24-24.svg';
import GridIcon from 'shared/assets/icon/tiled-24-24.svg';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

interface ArticleViewSwitcherProps {
	className?: string;
	view: ArticleListView
	onViewClick?: (view: ArticleListView) => void
}

const viewTypes: { view: ArticleListView, icon: React.VFC<React.SVGProps<SVGSVGElement>> }[] = [
	{
		view: 'grid',
		icon: GridIcon
	},
	{
		view: 'list',
		icon: ListIcon
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
		<div className={clsx([className])}>
			{
				viewTypes.map(viewType => (
					<Button key={viewType.view}
						variant='clear'
						// в onClick попадает ()=>{onViewClick?.(viewType.view)}
						onClick={onClick(viewType.view)}>
						<Icon Svg={viewType.icon}
							className={clsx(
								{ [cls.notSelected]: viewType.view !== view }
							)}
						/>
					</Button>
				))
			}
		</ div >
	)
}