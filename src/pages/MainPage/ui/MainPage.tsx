import { useTranslation } from 'react-i18next'
import { BugButton } from 'shared/ui/BugButton/BugButton'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { Page } from 'widgets/Page/Page'

const MainPage = () => {
	const { t } = useTranslation()
	return (
		<Page>
			<VStack>
				<ListBox
					items={[
						{ value: '1', content: '1', disabled: true },
						{ value: '2', content: '2' },
						{ value: '3', content: '3' },
					]}
					onChange={() => { }}
					defaultValue='кнопка попка'
				/>
			</VStack>
			<div>
				{t('main page')}
			</div>
		</Page>
	)
}
export default MainPage
