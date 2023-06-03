import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/deprecated/Button/Button'

import cls from './EditableProfileCardButtons.module.scss'
import { HStack } from '@/shared/ui/deprecated/Stack'

interface EditableProfileCardButtonsProps {
	className?: string
	canEdit?: boolean
	readonly?: boolean
	hasInputErrors?: boolean
	onEditProfile?: () => void
	onSaveProfile?: () => void
	onCancelProfileChanges?: () => void
}

export const EditableProfileCardButtons = (props: EditableProfileCardButtonsProps) => {
	const {
		className,
		canEdit,
		readonly,
		hasInputErrors,
		onEditProfile,
		onSaveProfile,
		onCancelProfileChanges,
	} = props
	const { t } = useTranslation('profile')

	return (
		<HStack gap='gap_16' className={clsx([className])}>
			{!canEdit
				? null
				:
				<Button
					size={ButtonSize.size_m}
					variant={ButtonVariant.backgroundInverted_border}
					disabled={hasInputErrors}
					onClick={readonly ? onEditProfile : onSaveProfile}
				>
					{readonly ? t('edit') : t('save profile')}
				</Button>}
			{readonly
				? null
				:
				<Button
					size='size_m'
					variant='outline_red'
					onClick={onCancelProfileChanges}
				>
					{t('cancel changes in profile')}
				</Button>
			}
		</HStack>
	)
}