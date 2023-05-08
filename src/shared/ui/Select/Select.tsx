import clsx from 'clsx'
import { ChangeEvent, memo, ReactNode, useMemo } from 'react'
import cls from './Select.module.scss'

export interface SelectOptions<T extends string> {
	value: T
	content: ReactNode
}

interface SelectProps<T extends string> {
	className?: string
	options?: SelectOptions<T>[]
	label?: string
	value?: T
	onChange?: (value: T) => void
	readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
	const {
		className,
		label,
		options,
		value,
		onChange,
		readonly
	} = props

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		// нужно привести к T, потому что у html элемента это всегда по умолчанию строка
		onChange?.(e.target.value as T)
	}

	const optionList = useMemo(() => {
		return options?.map((item: SelectOptions<T>) =>
			<option
				key={item.value}
				value={item.value}
				className={cls.option}
			>
				{item.content}
			</option>
		)
	}, [options])

	return (
		<div className={clsx(
			cls.wrapper,
			[className]
		)}
		>
			{label && (
				<span className={cls.label}>
					{label}
				</span>
			)}
			<select className={clsx(cls.select)}
				value={value}
				onChange={onChangeHandler}
				disabled={readonly}
			>
				{optionList}
			</select>
		</div>
	)
}
// Select.displayName = 'Select'