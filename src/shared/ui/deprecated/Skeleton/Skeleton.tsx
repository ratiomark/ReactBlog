import { CSSProperties, memo } from 'react';
import clsx from 'clsx';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
	className?: string
	width?: string | number
	height?: string | number
	borderRadius?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
	const {
		className,
		width,
		height,
		borderRadius
	} = props

	const styles: CSSProperties = {
		width,
		height,
		borderRadius,
	}

	return (
		<div
			className={clsx(cls.Skeleton, [className])}
			style={styles}
		/>
	)
})
Skeleton.displayName = 'Skeleton'