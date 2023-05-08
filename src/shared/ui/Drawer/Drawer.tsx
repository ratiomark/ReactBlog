import { useModal } from '@/shared/lib/helpers/hooks/useModal';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/helpers/providersAndComponents/AnimationProvider';
import clsx from 'clsx';
import { ReactNode, useCallback, useEffect } from 'react';
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

const height = window.innerHeight - 100

const DrawerContent = (props: DrawerProps) => {
	const {
		className,
		onClose,
		isOpen,
		scroll,
		children,
		lazy,
		animationDelay = 300
	} = props

	// const {
	// 	isMounted,
	// 	isClosing,
	// 	onCloseHandler
	// } = useModal({ isOpen, onClose, animationDelay })

	const { Gesture, Spring } = useAnimationLibs()
	const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false })
	}, [api])

	useEffect(() => {
		if (isOpen) {
			openDrawer();
		}
	}, [api, isOpen, openDrawer]);

	const close = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onClose,
		});
	};

	const bind = Gesture.useDrag(
		({
			last,
			velocity: [, vy],
			direction: [, dy],
			movement: [, my],
			cancel,
		}) => {
			if (my < -70) cancel();

			if (last) {
				if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
					close();
				} else {
					openDrawer();
				}
			} else {
				api.start({ y: my, immediate: true });
			}
		},
		{
			from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
		},
	);

	if (!isOpen) {
		return null;
	}

	const display = y.to((py) => (py < height ? 'block' : 'none'));

	// const mods: Record<string, boolean | undefined> = {
	// 	[cls.opened]: isOpen,
	// 	[cls.isClosing]: isClosing,
	// }


	if (lazy && !isOpen) return null

	return (
		<Portal>
			<div className={clsx(
				cls.Drawer,
				// mods,
				'app_drawer',
				[className])}
			>
				<Overlay onClick={onClose} />
				<Spring.a.div
					className={clsx(cls.sheet, { [cls.scroll]: scroll })}
					// className={cls.sheet}
					style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
					{...bind()}
				>
					{children}
				</Spring.a.div>
			</div>
		</Portal>
	)
}

const DrawerAsync = (props: DrawerProps) => {
	const { isLoaded } = useAnimationLibs()
	if (!isLoaded) {
		return null
	}
	return <DrawerContent {...props} />
}

export const Drawer = (props: DrawerProps) => {
	return (
		<AnimationProvider>
			<DrawerAsync {...props} />
		</AnimationProvider>
	)
}