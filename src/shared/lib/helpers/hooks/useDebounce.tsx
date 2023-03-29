import { useRef, useCallback } from 'react'

// пока не пройдет delay не выполнит коллбек
export function useDebounce(callback: (...args: any[]) => void, delay = 500) {
	const timer = useRef<any>()

	return useCallback((...args: any[]) => {
		if (timer.current) {
			clearTimeout(timer.current)
		}

		timer.current = setTimeout(() => {
			callback(...args)
		}, delay)

	}, [callback, delay])

}