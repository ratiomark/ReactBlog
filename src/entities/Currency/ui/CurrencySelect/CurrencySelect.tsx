import clsx from 'clsx'
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popup/ui/ListBox/ListBox';

interface CurrencySelectProps {
	className?: string
	value?: string
	onChange?: (value: Currency) => void
	readonly?: boolean
}
const options = [
	{ value: Currency.eur, content: Currency.eur },
	{ value: Currency.usd, content: Currency.usd },
	{ value: Currency.rub, content: Currency.rub }
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
	const {
		className,
		value,
		onChange,
		readonly
	} = props
	const { t } = useTranslation()

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Currency)
	}, [onChange])


	// 	<ListBox
	// 		className={className}
	// 		defaultValue={t('country')}
	// 		value={value}
	// 		onChange={onChangeHandler}
	// 		items={options}
	// 		readonly={readonly}
	// label = { t('currency') }
	// 		labelPadding='gap_8'
	// 		labelPosition='left'
	// 		listBoxPosition='center'
	// 	/>

	return (
		<ListBox
			className={className}
			defaultValue={t('country')}
			value={value}
			onChange={onChangeHandler}
			items={options}
			readonly={readonly}
			label={t('currency')}
			labelPadding='gap_8'
			labelPosition='left'
			listBoxPosition='center'
		/>


	)
})
CurrencySelect.displayName = 'CurrencySelect'