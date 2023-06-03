import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ListBox.module.scss';
import { Listbox as HListbox } from '@headlessui/react'
import { ElementType, Fragment, MutableRefObject, ReactNode, useEffect, useMemo, useRef, } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';
import CheckIcon from '@/shared/assets/icon/check-icon.svg'
import { VStack, HStack } from '../../../Stack';
import { FlexAlign, FlexGap } from '../../../Stack/Flex/Flex';
import { Button } from '../../../Button/Button';
import ArrowBottomIcon from '@/shared/assets/icons_redesigned/arrow-bottom.svg'
import { Icon } from '../../../Icon/Icon';

export interface ListBoxItems<T extends string> {
	value: string | T
	content: ReactNode
	disabled?: boolean
}

interface ListBoxProps<T extends string> {
	className?: string
	as?: ElementType<any>
	items?: ListBoxItems<string | T>[]
	value?: string | T
	defaultValue?: string | T
	onChange: (value: T) => void
	readonly?: boolean
	listDirection?: AbsoluteListDirection
	label?: string
	labelPosition?: 'top' | 'left'
	listBoxPosition?: FlexAlign
	labelPadding?: FlexGap
	sameWidth?: boolean
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
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
		labelPadding = 'gap_4',
		sameWidth = false,
	} = props
	const listBoxOptionsRef = useRef() as MutableRefObject<HTMLDivElement>
	const listBoxRef = useRef() as MutableRefObject<HTMLButtonElement>
	const Stack = labelPosition === 'top' ? VStack : HStack

	const selectedItemLocalized = useMemo(() => {
		return items?.find(item => item.value === value)
	}, [items, value])

	useEffect(() => {
		if (sameWidth) {
			listBoxOptionsRef.current.style.width = `${listBoxOptionsRef.current.offsetWidth + 3}px`
			listBoxRef.current.style.width = `${listBoxOptionsRef.current.offsetWidth}px`
		}
	}, [sameWidth])

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
				{({ open }) => (
					<>
						<HListbox.Button as={'div'} aria-disabled={readonly} className={cls.trigger}>
							<Button
								ref={listBoxRef}
								className={clsx(cls.ListBoxButton)}
								disabled={readonly}
								variant='filled'
								borderRadius='borderRadius_34'
								addonRight={<Icon Svg={ArrowBottomIcon} />}
							>
								{selectedItemLocalized?.content ?? defaultValue}
							</Button>
						</HListbox.Button>
						{
							<div
								className={clsx(cls.ListBoxListOptionsWrapper, { [cls.hideOptions]: !open },)}
								ref={listBoxOptionsRef}
							>

								<HListbox.Options
									static={true}
									className={clsx(
										cls.ListBoxListOptions,
										{ [cls.hideOptions]: !open },
										listDirection)
									}

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
															{ [cls.ListBoxOption_selected]: selected },
														)}
													>
														{selected}
														{/* {selected && <CheckIcon className={cls.iconCheck} />} */}
														{item.content}
													</li>
												)}
											</HListbox.Option>
										))
									}
								</HListbox.Options>
							</div>
						}
					</>
				)}
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
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './ListBox.module.scss';
// import { Listbox as HListbox } from '@headlessui/react'
// import { ElementType, Fragment, ReactNode, } from 'react';
// import { AbsoluteListDirection } from '@/shared/types/ui';
// import { Button } from '@/shared/ui/Button/Button';
// import { VStack, HStack } from '@/shared/ui/Stack';
// import { FlexAlign, FlexGap } from '@/shared/ui/Stack/Flex/Flex';



// export interface ListBoxItems {
// 	value: string
// 	content: ReactNode
// 	disabled?: boolean
// }

// interface ListBoxProps {
// 	className?: string
// 	as?: ElementType<any>
// 	items?: ListBoxItems[]
// 	value?: string
// 	defaultValue?: string
// 	onChange: (value: string) => void
// 	readonly?: boolean
// 	listDirection?: AbsoluteListDirection
// 	label?: string
// 	labelPosition?: 'top' | 'left'
// 	listBoxPosition?: FlexAlign
// 	labelPadding?: FlexGap
// }

// export const ListBox = (props: ListBoxProps) => {
// 	const {
// 		items = [],
// 		as = 'div',
// 		className,
// 		value,
// 		defaultValue = 'Заглушка',
// 		listDirection = 'bottom_right',
// 		onChange,
// 		readonly,
// 		label,
// 		labelPosition = 'top',
// 		listBoxPosition = 'left',
// 		labelPadding = 'gap_4'
// 	} = props

// 	const Stack = labelPosition === 'top' ? VStack : HStack

// 	return (
// 		<Stack
// 			className={className}
// 			gap={labelPadding}
// 			align={listBoxPosition}
// 		>

// 			{label && <span className={clsx(cls.label, { [cls.textDisabled]: readonly })}>
// 				{label}
// 			</span>}
// 			<HListbox
// 				className={cls.ListBox}
// 				value={value}
// 				onChange={onChange}
// 				disabled={readonly}
// 				as={as}
// 			>
// 				<HListbox.Button as={'div'} aria-disabled={readonly} className={cls.trigger}>
// 					<Button
// 						className={clsx(cls.ListBoxButton)}
// 						disabled={readonly}
// 						variant='outline'
// 					>
// 						{value ?? defaultValue}
// 					</Button>
// 				</HListbox.Button>
// 				<HListbox.Options
// 					className={clsx(cls.ListBoxListOptions, listDirection)}
// 				>
// 					{
// 						items?.map(item => (
// 							<HListbox.Option
// 								key={item.value}
// 								value={item.value}
// 								disabled={item.disabled}
// 								as={Fragment}
// 							>
// 								{({ active, selected }) => (
// 									<li
// 										className={clsx(
// 											cls.ListBoxOption,
// 											{ [cls.ListBoxOption_active]: active },
// 											{ [cls.ListBoxOption_disabled]: item.disabled },
// 										)}
// 									>
// 										{selected && '!!!!'}
// 										{item.content}
// 									</li>
// 								)}
// 							</HListbox.Option>
// 						))
// 					}
// 				</HListbox.Options>
// 			</HListbox>
// 		</Stack>
// 	)
// }

// // export const ListBox = (props: ListBoxProps) => {
// // 	const {
// // 		className
// // 	} = props

// // 	const { t } = useTranslation()

// // 	return (
// // 		<div className={clsx(
// // 			cls.ListBox,
// // 			[className])}
// // 		>

// // 		</div>
// // 	)
// // }


// VAR: перед экспериментами с шириной
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './ListBox.module.scss';
// import { Listbox as HListbox } from '@headlessui/react'
// import { ElementType, Fragment, MutableRefObject, ReactNode, useEffect, useRef, } from 'react';
// import { AbsoluteListDirection } from '@/shared/types/ui';
// import { Button } from '@/shared/ui/Button/Button';
// import { VStack, HStack } from '@/shared/ui/Stack';
// import { FlexAlign, FlexGap } from '@/shared/ui/Stack/Flex/Flex';
// import CheckIcon from '@/shared/assets/icon/check-icon.svg'


// export interface ListBoxItems<T extends string> {
// 	value: string | T
// 	content: ReactNode
// 	disabled?: boolean
// }

// interface ListBoxProps<T extends string> {
// 	className?: string
// 	as?: ElementType<any>
// 	items?: ListBoxItems<string | T>[]
// 	value?: string | T
// 	defaultValue?: string | T
// 	onChange: (value: T) => void
// 	readonly?: boolean
// 	listDirection?: AbsoluteListDirection
// 	label?: string
// 	labelPosition?: 'top' | 'left'
// 	listBoxPosition?: FlexAlign
// 	labelPadding?: FlexGap
// }

// export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
// 	const {
// 		items = [],
// 		as = 'div',
// 		className,
// 		value,
// 		defaultValue = 'Заглушка',
// 		listDirection = 'bottom_right',
// 		onChange,
// 		readonly,
// 		label,
// 		labelPosition = 'top',
// 		listBoxPosition = 'left',
// 		labelPadding = 'gap_4'
// 	} = props
// 	const listBoxOptionsRef = useRef() as MutableRefObject<HTMLElement>
// 	const listBoxRef = useRef() as MutableRefObject<HTMLButtonElement>
// 	const Stack = labelPosition === 'top' ? VStack : HStack

// 	useEffect(() => {
// 		const listBoxOptions = document.querySelector('#sfsd') as HTMLDivElement
// 		if (listBoxRef.current && listBoxOptions) {
// 			listBoxRef.current.style.width = `${listBoxOptions.offsetWidth}px`
// 			// console.log(listBoxOptionsRef.current.clientWidth)
// 		}
// 		// console.log(listBoxRef.current)
// 		console.log(listBoxOptions ? listBoxOptions.clientWidth : 'фчхчхчхчхчх')
// 	})

// 	return (
// 		<Stack
// 			className={className}
// 			gap={labelPadding}
// 			align={listBoxPosition}
// 		>

// 			{label && <span className={clsx(cls.label, { [cls.textDisabled]: readonly })}>
// 				{label}
// 			</span>}
// 			<HListbox
// 				className={cls.ListBox}
// 				value={value}
// 				onChange={onChange}
// 				disabled={readonly}
// 				as={as}

// 			>
// 				<HListbox.Button as={'div'} ref={listBoxRef} aria-disabled={readonly} className={cls.trigger}>
// 					<Button
// 						// @ts-ignore
// 						// ref={listBoxRef}
// 						className={clsx(cls.ListBoxButton)}
// 						disabled={readonly}
// 						variant='outline'
// 					>
// 						{value ?? defaultValue}
// 					</Button>
// 				</HListbox.Button>
// 				<HListbox.Options
// 					static={true}
// 					// unmount={false}
// 					className={clsx(cls.ListBoxListOptions, listDirection)}
// 					id='sfsd'
// 				>
// 					{
// 						items?.map(item => (
// 							<HListbox.Option
// 								key={item.value}
// 								value={item.value}
// 								disabled={item.disabled}
// 								as={Fragment}
// 							>
// 								{({ active, selected }) => (
// 									<li

// 										// ref={listBoxOptionsRef}
// 										className={clsx(
// 											cls.ListBoxOption,
// 											{ [cls.ListBoxOption_active]: active },
// 											{ [cls.ListBoxOption_disabled]: item.disabled },
// 											{ [cls.ListBoxOption_selected]: selected },
// 										)}
// 									>
// 										{selected && <CheckIcon className={cls.iconCheck} />}
// 										{item.content}
// 									</li>
// 								)}
// 							</HListbox.Option>
// 						))
// 					}
// 				</HListbox.Options>
// 			</HListbox>
// 		</Stack>
// 	)
// }
