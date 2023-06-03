import clsx from 'clsx';
import { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './AppImage.module.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string
	fallback?: ReactElement
	errorFallback?: ReactElement
}

export const AppImage = (props: AppImageProps) => {
	const {
		className,
		src = '',
		alt = 'image',
		fallback,
		errorFallback,
		...otherProps
	} = props

	// этот эффект вызывается еще до того как компонент вмонтируется 
	useLayoutEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			setIsLoading(false)
		}
		img.onerror = () => {
			setIsLoading(false)
			setHasError(true)
		}
	}, [src])

	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	if (isLoading && fallback) return fallback

	if (hasError && errorFallback) return errorFallback

	return (
		<img className={className} src={src} alt={alt} {...otherProps} />
	)
}