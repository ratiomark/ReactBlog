import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Portal } from '../Portal/Portal';
import cls from "./Modal.module.scss"

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
	const { children, className, isOpen, onClose } = props

	const [isClosing, setIsClosing] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout>>()


	const onCloseHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, ANIMATION_DELAY)
		}
	}, [onClose])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCloseHandler()
		}
	}, [onCloseHandler])

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}

		return () => {
			clearTimeout(timerRef.current)
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])


	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const mods: Record<string, boolean> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])} >
				<div className={cls.overlay} onClick={onCloseHandler} >
					<div className={cls.content} onClick={onContentClick} >
						{children}
					</div>
				</div>
			</div>
		</Portal>
	)
}