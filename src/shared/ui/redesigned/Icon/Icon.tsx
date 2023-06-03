import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Icon.module.scss';
import IconEye from '@/shared/assets/icon/eye-20-20.svg'

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>
// базовые пропсы для всех СВГ, неважно кликалбельные или нет

interface IconBaseProps extends SvgProps {
	className?: string
	Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

interface UnClickableProps extends IconBaseProps {
	clickable?: false
}
interface ClickableProps extends IconBaseProps {
	clickable: true
	onClick: () => void
}

type IconProps = UnClickableProps | ClickableProps

export const Icon = (props: IconProps) => {
	const {
		className,
		Svg = IconEye,
		width = 32,
		height = 32,
		...otherProps
	} = props

	if (props.clickable) {
		return (
			<button
				style={{ width, height }}
				type='button'
				onClick={props.onClick}
				className={clsx(cls.button, className)}
			>
				<Svg
					className={clsx(
						cls.Icon
					)}
					width={width}
					height={height}
					{...otherProps}
					onClick={undefined}
				/>
			</button>
		)
	}

	return (
		<Svg
			className={clsx(
				cls.Icon,
				className
			)}
			width={width}
			height={height}
			{...otherProps}
		/>)
}