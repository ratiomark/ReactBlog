import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ForbiddenPage = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<div>
			{t('about')}
		</div>
	)
})
ForbiddenPage.displayName = 'ForbiddenPage'
export default ForbiddenPage;