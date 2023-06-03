import { useMobile } from '@/shared/lib/helpers/hooks/useMobile';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import clsx from 'clsx'
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RatingCard.module.scss'
import { VStack, HStack } from '@/shared/ui/deprecated/Stack';

interface RatingCardProps {
	className?: string;
	feedbackTitle?: string
	title?: string
	hasFeedback?: boolean
	onAccept?: (starCount: number, feedback?: string) => void
	onCancel?: (starCount: number) => void
	rate?: number
}

export const RatingCard = (props: RatingCardProps) => {
	const {
		className,
		feedbackTitle = 'Оставьте пожалуйста отзыв',
		title = 'Оцените контент',
		hasFeedback = true,
		onAccept,
		onCancel,
		rate = 0,
	} = props
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [starsCount, setStarsCount] = useState(rate)
	const [userFeedback, setUserFeedback] = useState('')
	const { t } = useTranslation()
	const isMobile = useMobile()
	const onFeedbackChange = (feedback: string) => setUserFeedback(feedback)

	const onSelectStar = useCallback((selectedStarCount: number) => {
		setStarsCount(selectedStarCount)
		if (hasFeedback) setIsModalOpen(true)
		else onAccept?.(selectedStarCount)
	}, [hasFeedback, onAccept])

	const onCancelModal = useCallback(() => {
		setIsModalOpen(false)
		onCancel?.(starsCount)
	}, [onCancel, starsCount])

	const onAcceptModal = useCallback(() => {
		setIsModalOpen(false)
		onAccept?.(starsCount, userFeedback)
	}, [onAccept, userFeedback, starsCount])

	const modalContent = (
		// <Modal isOpen={isModalOpen} onClose={onCancelModal} lazy>
		<VStack max gap="gap_20">
			<Text title={feedbackTitle} />
			<Input onChangeString={onFeedbackChange} placeholder="Ваш комментарий" />
			<HStack gap='gap_8' max justify="end">
				<Button
					variant="outline_red"
					onClick={onCancelModal}
				>
					{t('Close button')}
				</Button>
				<Button
					variant="backgroundInverted"
					onClick={onAcceptModal}
				>
					{t('Send button')}
				</Button>
			</HStack>
		</VStack>
	)

	// let modal
	// if (isMobile) {
	// 	modal = (<Drawer isOpen={isModalOpen} onClose={onCancelModal} lazy > </Drawer>)
	// } else {
	// 	modal = (<Modal isOpen={isModalOpen} onClose={onCancelModal} lazy>{modalContent}</Modal>)
	// }

	const modal = isMobile
		? (<Drawer isOpen={isModalOpen} onClose={onCancelModal} lazy>{modalContent}</Drawer>)
		: (<Modal isOpen={isModalOpen} onClose={onCancelModal} lazy>{modalContent}</Modal>)

	return (
		<Card className={clsx(cls.RatingCard, [className])}>
			<VStack max align="center" gap="gap_8">
				<Text title={starsCount ? t('thanks for evaluation') : title} />
				<StarRating selectedStar={starsCount} size={40} onSelect={onSelectStar} />
			</VStack>
			{modal}
		</Card >
	)
}