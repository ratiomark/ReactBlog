import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { classNames } from 'shared/lib/helpers/classNames/classNames'

interface PortalProps {
	//children - то что я телепортирую, а element - куда я телепортирую
	children: ReactNode
	element?: HTMLElement | Element
}

export const Portal = ({ children, element = document.body }: PortalProps) => {
	return createPortal(children, element)
}