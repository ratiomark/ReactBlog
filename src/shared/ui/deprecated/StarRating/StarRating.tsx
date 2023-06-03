import clsx from 'clsx';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icon/star-rating.svg'
import { Icon } from '../Icon/Icon';
import { useState } from 'react';

interface StarRatingProps {
	className?: string
	onSelect?: (starsCount: number) => void
	size?: number
	selectedStar?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = (props: StarRatingProps) => {
	const {
		className,
		onSelect,
		size = 50,
		selectedStar = 0
	} = props
	const [currentStar, setCurrentStar] = useState(selectedStar)
	const [isSelected, setIsSelected] = useState<boolean | number>(Boolean(selectedStar))

	const onHover = (starNumber: number) => () => {
		if (!isSelected) {
			setCurrentStar(starNumber)
		}
	}
	const onLeave = () => {
		if (!isSelected) {
			setCurrentStar(0)
		}
	}
	const onStarClick = (starNumber: number) => () => {
		if (!isSelected) {
			onSelect?.(starNumber)
			setIsSelected(true)
			setCurrentStar(starNumber)
		}
	}

	return (
		<div className={clsx(
			cls.StarRating,
			[className])}
		>
			{stars.map(starNumber => (
				<Icon
					className={clsx(
						cls.starIcon,
						{ [cls.hovered]: currentStar >= starNumber },
						{ [cls.selected]: isSelected }
					)}
					onMouseEnter={onHover(starNumber)}
					onMouseLeave={onLeave}
					onClick={onStarClick(starNumber)}
					Svg={StarIcon}
					key={starNumber}
					width={size}
					height={size}
				/>
			)

			)}
		</div>
	)
}