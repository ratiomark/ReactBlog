import clsx from 'clsx';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

interface HStackProps extends Omit<FlexProps, 'direction'> {
	className?: string
	children: ReactNode
}

export const HStack = (props: HStackProps) => {
	const {
		className,
		children,
		...otherProps
	} = props

	const { t } = useTranslation()

	return (
		<Flex
			className={clsx([className])}
			{...otherProps}
		>
			{children}
		</Flex>
	)
}