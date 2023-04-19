import { classNames } from '@/shared/lib/helpers/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
	className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
	return (
		<div className={classNames('lds-roller', {}, [className])} >
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
		</div>
	)
}