import { Text } from '@/shared/ui/redesigned/Text/Text';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<div>

			<Text title='настройки' />
		</div>
	)
})
SettingsPage.displayName = 'SettingsPage'
export default SettingsPage;