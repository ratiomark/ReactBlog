import clsx from 'clsx'
import { ChangeEvent, memo, ReactNode, useMemo } from 'react'
import cls from './Select.module.scss'

export interface SelectOptions {
	value: string
	content: ReactNode
}

interface SelectProps {
	className?: string
	options?: SelectOptions[]
	label?: string
	value?: string
	onChange?: (value: string) => void
	readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
	const {
		className,
		label,
		options,
		value,
		onChange,
		readonly
	} = props

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value)
	}

	const optionList = useMemo(() => {
		return options?.map(item =>
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
})