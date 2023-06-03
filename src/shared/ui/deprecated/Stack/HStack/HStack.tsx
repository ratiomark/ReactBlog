import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, FlexOwnProps, } from '../Flex/Flex';

interface HStackProps extends Omit<FlexOwnProps, 'direction'> {
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
			className={className}
			{...otherProps}
		>
			{children}
		</Flex>
	)
}