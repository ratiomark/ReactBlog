import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import cls from './EditableProfileCardButtons.module.scss'
import { Button } from '@/shared/ui/redesigned/Button/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar'

interface EditableProfileCardButtonsProps {
	className?: string
	canEdit?: boolean
	readonly?: boolean
	hasInputErrors?: boolean
	onEditProfile?: () => void
	onSaveProfile?: () => void
	onCancelProfileChanges?: () => void
}

export const EditableProfileCardButtonsRedesigned = (props: EditableProfileCardButtonsProps) => {
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
		<HStack gap='gap_16' max justify='center' className={clsx([className])}>
			{readonly
				? null
				:
				<Button
					size='size_m'
					onClick={onCancelProfileChanges}
					variant={'cancel'}
				>
					{t('cancel changes in profile')}
				</Button>
			}
			{!canEdit
				? null
				:
				<Button
					size='size_m'
					// variant=''
					variant={!readonly ? 'success' : undefined}
					disabled={hasInputErrors}
					onClick={readonly ? onEditProfile : onSaveProfile}
				>
					{readonly ? t('edit') : t('save profile')}
				</Button>
			}

		</HStack>
	)
}