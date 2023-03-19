import { useMemo } from 'react';
import clsx from 'clsx'
import { CSSProperties } from 'react';
import cls from './Avatar.module.scss'

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
			width: size || 100,
			height: size || 100,
		}
	}, [size])

	return <img
		src={src}
		alt={alt}
		style={styles}
		className={clsx(
			cls.Avatar,
			[className]
		)}

	/>
}