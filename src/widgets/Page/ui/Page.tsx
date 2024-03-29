import { StateSchema } from '@/app/providers/StoreProvider';
import clsx from 'clsx';
import { getUIScrollByPath, uiActions } from '@/features/ScrollSave';
import { memo, MutableRefObject, ReactNode, useRef, UIEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/helpers/hooks/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/helpers/hooks/useInitialEffect';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle';
import cls from './Page.module.scss';
import { TestProps } from '@/shared/types/TestProps';
import { toggleFeatures } from '@/shared/lib/features';

interface PageProps extends TestProps {
	className?: string
	children?: ReactNode,
	onScrollEnd?: () => void
	isLoading?: boolean
}

export const Page = memo((props: PageProps) => {
	const {
		className,
		children,
		onScrollEnd,
		isLoading,

	} = props
	const dispatch = useAppDispatch()
	const { pathname } = useLocation()
	// Этот селектор, кроме стейта, также принимает дополнительный аргумент - path. 
	// Поэтому нужно передать стрелочную функцию, чтобы добавить нужный аргумент. Эти танцы с бубном нужны потому что useSelector умеет работать только с теми селекторами у которых один аргумент(стейт).
	const scrollPosition = useSelector(
		(state: StateSchema) => getUIScrollByPath(state, pathname)
	)

	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition
	})

	useInfiniteScroll({
		callback: onScrollEnd,
		wrapperRef: toggleFeatures({
			name: 'isAppRedesigned',
			off: () => undefined,
			on: () => wrapperRef
		}),
		triggerRef,
		isLoading
	})

	const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
		dispatch(uiActions.setScrollPosition({
			position: e.currentTarget.scrollTop,
			path: pathname
		}))
	})

	const pageClass = toggleFeatures({
		name: 'isAppRedesigned',
		off: () => cls.Page,
		on: () => cls.Page_redesigned,
	})

	return (
		<main
			ref={wrapperRef}
			className={clsx(pageClass, className)}
			onScroll={onScroll}
			data-testid={props['data-testid'] ?? 'Page'}
		>
			{/* <div className={cls.wrapper}> */}
			{children}
			{/* </div> */}
			{onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
		</main>
	)
})
Page.displayName = 'PageComponent'