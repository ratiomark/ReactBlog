import { useState, useRef, MutableRefObject, useCallback, useEffect } from 'react'

interface UseModalProps {
	onClose?: () => void
	isOpen?: boolean
	animationDelay: number
}

export const useModal = (props: UseModalProps) => {
	const { onClose, animationDelay, isOpen } = props
	const [isMounted, setIsMounted] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	// const timerRef = useRef<ReturnType<typeof setTimeout>>()
	// VAR: Почему не работает верхний вариант?
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

	const onCloseHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, animationDelay)
		}
	}, [onClose, animationDelay])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCloseHandler()
		}
	}, [onCloseHandler])

	useEffect(() => {
		if (isOpen)
			setIsMounted(true)
	}, [isOpen])

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}

		return () => {
			clearTimeout(timerRef.current)
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	return {
		isMounted,
		isClosing,
		onCloseHandler
	}
}