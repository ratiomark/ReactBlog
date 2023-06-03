import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons_redesigned/app-image.svg'
import clsx from 'clsx';
import { HStack } from '../Stack';

interface AppLogoProps {
	className?: string;
}

// /**
//  * Устарел, используем новые компоненты из папки redesigned
//  * @deprecated
//  */
export const AppLogo = memo(({ className }: AppLogoProps) => {
	return (
		<HStack
			max
			justify="center"
			className={clsx(cls.appLogoWrapper, className)}
		>
			<div className={cls.gradientBig} />
			<div className={cls.gradientSmall} />
			<AppSvg className={cls.appLogo} />
		</HStack>
	);
});
