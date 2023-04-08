import clsx from 'clsx';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

interface VStackProps extends Omit<FlexProps, 'direction'> {
	className?: string
	children: ReactNode
}

export const VStack = (props: VStackProps) => {
	const {
		className,
		children,
		...otherProps
	} = props

	const { t } = useTranslation()

	return (
		<Flex
			className={clsx([className])}
			direction='column'
			{...otherProps}
		>
			{children}
		</Flex>
	)
}