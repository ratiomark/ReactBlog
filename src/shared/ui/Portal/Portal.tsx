import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { useEffect, useRef, useState } from "react";


interface PortalProps {
	//children - то что я телепортирую, а element - куда я телепортирую
	children: ReactNode
	element?: HTMLElement | Element
}

// export const Portal = (props: PortalProps) => {
// 	const {
// 		children,
// 		element = document.body,
// 	} = props;

// 	return createPortal(children, element);
// };

export const Portal = ({ children, element = document.body }: PortalProps) => {
	const ref = useRef(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		console.log("Portal отработал");
		ref.current = document.body
		// ref.current = document.querySelector("#root") || undefined;
		// ref.current = document.querySelector("#root") || undefined;
		setMounted(true);
		// return () => {
		// 	setMounted(false)
		// 	ref.current = null
		// }
	}, []);

	return mounted && ref.current ? createPortal(children, ref.current) : null;
	// return createPortal(children, element)
}