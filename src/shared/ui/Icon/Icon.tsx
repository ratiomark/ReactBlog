import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Icon.module.scss';
import IconEye from 'shared/assets/icon/eye-20-20.svg'
interface IconProps {
	className?: string
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = (props: IconProps) => {
	const {
		className,
		Svg = IconEye
	} = props


	return (
		<Svg className={clsx(
			cls.Icon,
			[className])}
		/>
	);
}