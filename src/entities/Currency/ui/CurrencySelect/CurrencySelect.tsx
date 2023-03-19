import clsx from 'clsx'
import { Currency } from '../../model/types/currency';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';

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

	return (
		<Select
			className={className}
			label={t('currency')}
			value={value}
			onChange={onChangeHandler}
			options={options}
			readonly={readonly}
		/>

	)
})
CurrencySelect.displayName = 'Currency Select'