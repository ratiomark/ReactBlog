import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import cls from './SearchPanel.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import SearchIcon from '@/shared/assets/icons_redesigned/search.svg'
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
interface SearchPanelProps {
	className?: string
	searchValue: string
	onChangeSearchValue: (searchValue: string) => void
	placeholder: string
}

export const SearchPanel = (props: SearchPanelProps) => {
	const {
		className,
		searchValue,
		onChangeSearchValue,
		placeholder
	} = props

	// const { t } = useTranslation()

	return (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<CardDeprecated className={clsx(
					cls.SearchPanel,
					[className])}
				>
					<InputDeprecated
						value={searchValue}
						onChangeString={onChangeSearchValue}
						placeholder={placeholder}
					/>
				</CardDeprecated>
			}
			on={

				// <>
				<Input
					value={searchValue}
					onChangeString={onChangeSearchValue}
					placeholder={placeholder}
					className={className}
					addonLeft={<Icon Svg={SearchIcon} />}
				/>
				// <Input
				// 	value={searchValue}
				// 	onChangeString={onChangeSearchValue}
				// 	placeholder={placeholder}
				// 	className={className}
				// 	addonLeft={<Icon Svg={SearchIcon} />}
				// />
				// <Input
				// 	value={searchValue}
				// 	onChangeString={onChangeSearchValue}
				// 	placeholder={placeholder}
				// 	className={className}
				// 	addonRight={<Icon Svg={SearchIcon} />}
				// />
				// <Input
				// 	value={searchValue}
				// 	onChangeString={onChangeSearchValue}
				// 	placeholder={placeholder}
				// 	className={className}
				// 	addonRight={<Icon Svg={SearchIcon} />}
				// 	addonLeft={<Icon Svg={SearchIcon} />}
				// />
				// <Input
				// 	value={searchValue}
				// 	onChangeString={onChangeSearchValue}
				// 	placeholder={placeholder}
				// 	className={className}
				// /> 
				// </> 

			}
		/>
	)
}