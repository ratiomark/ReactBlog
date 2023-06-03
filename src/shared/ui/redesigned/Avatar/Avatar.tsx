import { useMemo } from 'react';
import clsx from 'clsx'
import { CSSProperties } from 'react';
import cls from './Avatar.module.scss'
import { AppImage } from '../AppImage/AppImage';
import { Skeleton } from '../Skeleton/Skeleton';
import UserProfileDefaultIcon from '@/shared/assets/icon/profile.svg'
import { Icon } from '../Icon/Icon';

interface AvatarProps {
	className?: string
	src?: string
	size?: number
	alt?: string
}

export const Avatar = (props: AvatarProps) => {
	const {
		className,
		src,
		alt = 'image',
		size = 100,
	} = props

	const styles = useMemo<CSSProperties>(() => {
		return {
			width: size,
			height: size,
		}
	}, [size])

	const fallback = <Skeleton borderRadius='50%' width={size} height={size} />
	const errorFallback = (
		<Icon
			Svg={UserProfileDefaultIcon}
			width={size}
			height={size} />
	)

	return <AppImage
		fallback={fallback}
		errorFallback={errorFallback}
		src={src}
		alt={alt}
		style={styles}
		className={clsx(
			cls.Avatar,
			[className]
		)}

	/>
}