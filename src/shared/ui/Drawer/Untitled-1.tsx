import { useModal } from '@/shared/lib/helpers/hooks/useModal';
import { useAnimationLibs } from '@/shared/lib/helpers/providersAndComponents/AnimationProvider';
import { useSpring } from '@react-spring/web';
import clsx from 'clsx';
import { ReactNode, useCallback } from 'react';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
	className?: string
	isOpen?: boolean;
	lazy?: boolean;
	onClose?: () => void;
	animationDelay?: number
	children: ReactNode
	scroll?: boolean
}

const height = window.innerHeight - 150

export const Drawer = (props: DrawerProps) => {
	const {
		className,
		onClose,
		isOpen,
		scroll,
		children,
		lazy,
		animationDelay = 300
	} = props

	const {
		isMounted,
		isClosing,
		onCloseHandler
	} = useModal({ isOpen, onClose, animationDelay })

	const [{ y }, api] = useSpring(() => ({ y: height }))

	const openDrawer = useCallback(() => {
		api.start({y: 0, immediate: false})
	}, [])


	const mods: Record<string, boolean | undefined> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	}


	if (lazy && !isOpen) return null

	return (
		<Portal>
			<div className={clsx(
				cls.Drawer,
				mods,
				'app_drawer',
				[className])}
			>
				<Overlay onClick={onCloseHandler} />
				<div className={clsx(cls.content, { [cls.scroll]: scroll })}>
					{children}
				</div>
			</div>
		</Portal>
	)
}