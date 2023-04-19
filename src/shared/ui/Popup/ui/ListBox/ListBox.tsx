import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ListBox.module.scss';
import { Listbox as HListbox } from '@headlessui/react'
import { ElementType, Fragment, ReactNode, } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';
import { Button } from '@/shared/ui/Button/Button';
import { VStack, HStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexGap } from '@/shared/ui/Stack/Flex/Flex';



export interface ListBoxItems {
	value: string
	content: ReactNode
	disabled?: boolean
}

interface ListBoxProps {
	className?: string
	as?: ElementType<any>
	items?: ListBoxItems[]
	value?: string
	defaultValue?: string
	onChange: (value: string) => void
	readonly?: boolean
	listDirection?: AbsoluteListDirection
	label?: string
	labelPosition?: 'top' | 'left'
	listBoxPosition?: FlexAlign
	labelPadding?: FlexGap
}

export const ListBox = (props: ListBoxProps) => {
	const {
		items = [],
		as = 'div',
		className,
		value,
		defaultValue = 'Заглушка',
		listDirection = 'bottom_right',
		onChange,
		readonly,
		label,
		labelPosition = 'top',
		listBoxPosition = 'left',
		labelPadding = 'gap_4'
	} = props

	const Stack = labelPosition === 'top' ? VStack : HStack

	return (
		<Stack
			className={className}
			gap={labelPadding}
			align={listBoxPosition}
		>

			{label && <span className={clsx(cls.label, { [cls.textDisabled]: readonly })}>
				{label}
			</span>}
			<HListbox
				className={cls.ListBox}
				value={value}
				onChange={onChange}
				disabled={readonly}
				as={as}
			>
				<HListbox.Button aria-disabled={readonly} className={cls.trigger}>
					<Button
						className={clsx(cls.ListBoxButton)}
						disabled={readonly}
						variant='outline'
					>
						{value ?? defaultValue}
					</Button>
				</HListbox.Button>
				<HListbox.Options
					className={clsx(cls.ListBoxListOptions, listDirection)}
				>
					{
						items?.map(item => (
							<HListbox.Option
								key={item.value}
								value={item.value}
								disabled={item.disabled}
								as={Fragment}
							>
								{({ active, selected }) => (
									<li
										className={clsx(
											cls.ListBoxOption,
											{ [cls.ListBoxOption_active]: active },
											{ [cls.ListBoxOption_disabled]: item.disabled },
										)}
									>
										{selected && '!!!!'}
										{item.content}
									</li>
								)}
							</HListbox.Option>
						))
					}
				</HListbox.Options>
			</HListbox>
		</Stack>
	)
}

// export const ListBox = (props: ListBoxProps) => {
// 	const {
// 		className
// 	} = props

// 	const { t } = useTranslation()

// 	return (
// 		<div className={clsx(
// 			cls.ListBox,
// 			[className])}
// 		>

// 		</div>
// 	)
// }