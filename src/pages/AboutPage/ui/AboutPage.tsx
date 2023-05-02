import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = memo(() => {
	const { t, i18n } = useTranslation('about')

	return (
		<Page data-testid='AboutPage' >
			{t('about')}
		</Page>
	)
})
export default AboutPage;


