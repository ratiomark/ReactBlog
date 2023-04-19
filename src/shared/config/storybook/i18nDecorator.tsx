import { Story } from '@storybook/react';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
// import { Suspense } from 'react';
import i18nForTest from '../i18n/i18n';

export const I18nDecorator = (StoryComponent: Story) => (
	<Suspense fallback='загрузка'>
		<I18nextProvider i18n={i18nForTest}>
			<StoryComponent />
		</I18nextProvider>
	</Suspense>
);
// export const I18nDecorator = (story: () => Story) => (
// 	<Suspense fallback='загрузка'>
// 		<I18nextProvider i18n={i18nForTest}>
// 			{story()}
// 		</I18nextProvider>
// 	</Suspense>
// );

// // export decorators for storybook to wrap your