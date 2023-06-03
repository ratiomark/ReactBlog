import clsx from 'clsx';
import cls from './Overlay.module.scss';

interface OverlayProps {
	className?: string
	onClick?: () => void
}

export const Overlay = (props: OverlayProps) => {
	const {
		className,
		onClick
	} = props

	return (
		<div className={clsx(cls.Overlay, [className])} onClick={onClick} />
	)
}