import { useTranslation } from 'react-i18next'
import { ListBox } from '@/shared/ui/Popup/ui/ListBox/ListBox'
import { VStack } from '@/shared/ui/Stack/VStack/VStack'
import { Page } from '@/widgets/Page'
import { RatingCard } from '@/entities/Rating'


const items = [
	{ value: '1', content: '1', disabled: true },
	{ value: '2', content: '2' },
	{ value: '3', content: '3' },
]

const MainPage = () => {
	const { t } = useTranslation()
	return (
		<Page data-testid='MainPage'>
			<VStack>
				<ListBox
					items={items}
					onChange={() => { }}
					defaultValue='кнопка попка'
				/>
			</VStack>
			<div>
				{t('main page')}
			</div>
			<RatingCard rate={0} />
		</Page>
	)
}
export default MainPage
