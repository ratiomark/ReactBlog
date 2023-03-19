import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticlesPage = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<div>
			{t('about')}
		</div>
	)
})
ArticlesPage.displayName = 'ArticlesPage'
export default ArticlesPage;