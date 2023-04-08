import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import cls from './SearchPanel.module.scss';

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
		<Card className={clsx(
			cls.SearchPanel,
			[className])}
		>
			<Input
				value={searchValue}
				onChangeString={onChangeSearchValue}
				placeholder={placeholder}
			/>
		</Card>
	)
}