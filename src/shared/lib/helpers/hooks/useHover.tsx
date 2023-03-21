import { useCallback, useState } from 'react'

interface IUseHoverBind {
	onMouseLeave: () => void
	onMouseEnter: () => void
}

type TUseHoverResult = [boolean, IUseHoverBind]

export const useHover = (): TUseHoverResult => {
	const [isHover, setIsHover] = useState(false)
	const onMouseLeave = useCallback(() => {
		setIsHover(false)
	}, [])
	const onMouseEnter = useCallback(() => {
		setIsHover(true)
	}, [])
	return [isHover, { onMouseEnter, onMouseLeave }]
}