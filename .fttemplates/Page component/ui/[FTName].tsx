import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const [FTName] = memo(() => {
	const { t, i18n } = useTranslation()

	return (
		<div>
			{t('about')}
		</div>
	)
})
[FTName].displayName = '[FTName]'
export default [FTName];