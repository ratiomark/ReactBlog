import clsx from 'clsx';
import { useNotification } from '../../api/notificationApi';
import { useTranslation } from 'react-i18next';
import cls from './NotificationList.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface NotificationProps {
	className?: string
}

export const NotificationList = (props: NotificationProps) => {
	const {
		className
	} = props
	// нужно указывать null
	const { data, isError, isLoading } = useNotification(null, {
		pollingInterval: 5000
	})
	const { t } = useTranslation()

	if (isError) return <p>ОШИБКА</p>
	if (isLoading) {
		return (
			<VStack
				className={clsx(
					cls.notification,
					[className])}
				gap='gap_16'
				max
			>
				<Skeleton width='500px' borderRadius='8px' height='80px' />
				<Skeleton width='500px' borderRadius='8px' height='80px' />
				<Skeleton width='500px' borderRadius='8px' height='80px' />
			</VStack>)
	}

	return (
		<VStack
			className={clsx(
				cls.notification,
				[className])}
			gap='gap_16'
			max
		>
			{data?.map(item => <NotificationItem item={item} key={item.id} />)}
		</VStack>
	)
}