import {ReactNode} from 'react';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss'
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/helpers/hooks/useModal';
import clsx from 'clsx';

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	lazy?: boolean;
	onClose?: () => void;
	animationDelay?: number
}

export const Modal = (props: ModalProps) => {
	const {
		children,
		className,
		isOpen,
		onClose,
		lazy,
		animationDelay = 300
	} = props
	
	const {
		isMounted,
		isClosing,
		onCloseHandler
	} = useModal({ isOpen, onClose, animationDelay })

	const mods: Record<string, boolean | undefined> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	}
	if (lazy && !isOpen) return null
	// if (lazy && !isMounted) return null

	return (
		<Portal>
			<div className={clsx(cls.Modal, mods, [className])} >
				<Overlay onClick={onCloseHandler} />
				<div className={cls.content} >
					{children}
				</div>
			</div>
		</Portal>
	)
}

/* <Portal>
			<div className={classNames(cls.Modal, mods, [className])} >
				<div className={cls.overlay} onClick={onCloseHandler} >
					<div className={cls.content} onClick={onContentClick} >
						{children}
					</div>
					</div>
			</div>
		</Portal> */