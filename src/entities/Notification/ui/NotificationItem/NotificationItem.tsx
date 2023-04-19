import clsx from 'clsx';
import { Notification } from '../../model/types/notification';
import { useTranslation } from 'react-i18next';
import cls from './NotificationItem.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

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
		<Card className={clsx(
			cls.NotificationItem,
			[className])}
			variant={'outlined'}
		>
			<Text title={item.title} text={item.description}></Text>
		</Card>
	)

	if (item.href) {
		return <a className={cls.link} target="_blank" href={item.href}>{content}</a>
	}

	return content
}