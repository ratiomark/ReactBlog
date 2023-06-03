import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons_redesigned/app-image.svg'
import clsx from 'clsx';
import { HStack } from '../../deprecated/Stack';

interface AppLogoProps {
	className?: string;
	size?: number
}

// /**
//  * Устарел, используем новые компоненты из папки redesigned
//  * @deprecated
//  */
export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {

	return (
		<HStack
			max
			justify="center"
			className={clsx(cls.appLogoWrapper, className)}
		>
			<div className={cls.gradientBig} />
			<div className={cls.gradientSmall} />
			<AppSvg
				className={cls.appLogo}
				width={size}
				height={size}
				color='black'
			/>
		</HStack>
	);
});
