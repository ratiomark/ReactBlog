import clsx from 'clsx';
import { Notification } from '../../model/types/notification';
import { useTranslation } from 'react-i18next';
import cls from './NotificationItem.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface NotificationItemProps {
	className?: string
	item: Notification
}

export const NotificationItem = (props: NotificationItemProps) => {
	const {
		className,
		item
	} = props

	const { t } = useTranslation()

	const content = (
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<CardDeprecated
					className={clsx(
						cls.NotificationItem,
						className
					)}
					variant={'outlined'}
				>
					<TextDeprecated title={item.title} text={item.description}></TextDeprecated>
				</CardDeprecated>
			}

			on={
				<Card
					className={clsx(
						cls.NotificationItem,
						className
					)}
				>
					<Text title={item.title} text={item.description} />
				</Card>
			}
		/>
	)

	if (item.href) {
		return <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">{content}</a>
	}

	return content
}