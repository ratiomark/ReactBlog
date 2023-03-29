import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ScrollSave.module.scss';

interface ScrollSaveProps {
	className?: string
}

export const ScrollSave = (props: ScrollSaveProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.scrollSave,
			[className])}
		>

		</div>
	)
}