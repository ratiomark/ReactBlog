import React from 'react'
import { useTranslation } from 'react-i18next';
import { BugButton } from 'shared/ui/BugButton/BugButton';
import { Button } from 'shared/ui/Button/Button';

const AboutPage = () => {
	const { t, i18n } = useTranslation('about')

	return (
		<div>
			{t('about')}
		</div>
	)
}
export default AboutPage;


