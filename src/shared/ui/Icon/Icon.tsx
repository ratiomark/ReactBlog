import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Icon.module.scss';
import IconEye from '@/shared/assets/icon/eye-20-20.svg'

interface IconProps {
	className?: string
	Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	inverted?: boolean
}

export const Icon = (props: IconProps) => {
	const {
		className,
		Svg = IconEye,
		inverted
	} = props


	return (
		<Svg className={clsx(
			cls.Icon,
			[cls.inverted, inverted],
			[className])}
		/>
	);
}