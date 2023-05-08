import clsx from 'clsx'
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popup/ui/ListBox/ListBox';

interface CountrySelectProps {
	className?: string
	value?: string
	onChange?: (value: Country) => void
	readonly?: boolean
}

const options = [
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.USA, content: Country.USA },
	{ value: Country.Germany, content: Country.Germany },
]

export const CountrySelect = memo((props: CountrySelectProps) => {
	const {
		className,
		value,
		onChange,
		readonly
	} = props
	const { t } = useTranslation()

	const onChangeHandler = useCallback((value: Country) => {
		onChange?.(value)
	}, [onChange])

	return (
		<ListBox<Country>
			className={className}
			defaultValue={t('country')}
			value={value}
			onChange={onChangeHandler}
			items={options}
			readonly={readonly}
			label={t('country')}
			labelPadding='gap_8'
			labelPosition='left'
			listBoxPosition='center'
			sameWidth
		/>
	)
})
CountrySelect.displayName = 'CountrySelect'