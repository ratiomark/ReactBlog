import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AdminPanelPage = memo(() => {
	const { t } = useTranslation()

	return (
		<div>
			{t('about')}
		</div>
	)
})
AdminPanelPage.displayName = 'AdminPanelPage'
export default AdminPanelPage;