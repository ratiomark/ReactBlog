import { componentRender } from '@/shared/lib/tests/componentRender'
import { screen } from '@testing-library/react'
import { obtainRouteAbout, obtainRouteMain, obtainRouteProfile } from '../../config/routeConfig/routeConfig'
import { AppRouter } from './AppRouter'

export { }


describe('app/route/AppRouter', () => {

	test('About page render', async () => {
		componentRender(<AppRouter />, {
			route: obtainRouteAbout()
		})

		// findByTestId использую именно его, потому что это асинхронная функция, она нужна из-за ленивой загрузку страницы. Если бы я юзал getByTestId, то ничего бы не получилось
		const page = await screen.findByTestId('AboutPage')
		expect(page).toBeInTheDocument()

	})

	test('Страница не найдена', async () => {
		componentRender(<AppRouter />, {
			route: '/asdkfjoawiejf'
		})

		// findByTestId использую именно его, потому что это асинхронная функция, она нужна из-за ленивой загрузку страницы. Если бы я юзал getByTestId, то ничего бы не получилось
		const page = await screen.findByTestId('PageNotFound')
		expect(page).toBeInTheDocument()
	})
	test('Main page рендер', async () => {
		componentRender(<AppRouter />, {
			route: obtainRouteMain()
		})

		// findByTestId использую именно его, потому что это асинхронная функция, она нужна из-за ленивой загрузку страницы. Если бы я юзал getByTestId, то ничего бы не получилось
		const page = await screen.findByTestId('MainPage')
		expect(page).toBeInTheDocument()
	})

	test('Profile page рендер', async () => {
		componentRender(<AppRouter />, {
			route: obtainRouteProfile(1),
			initialState: {
				user: { _mounted: true, authData: { id: '1', username: 'TestUserName' } }
			}
		})

		// findByTestId использую именно его, потому что это асинхронная функция, она нужна из-за ленивой загрузку страницы. Если бы я юзал getByTestId, то ничего бы не получилось
		const page = await screen.findByTestId('ProfilePage')
		expect(page).toBeInTheDocument()
	})
	test('Редирект неавторизированного пользователя на главную', async () => {
		componentRender(<AppRouter />, {
			route: obtainRouteProfile(1),
		})

		// findByTestId использую именно его, потому что это асинхронная функция, она нужна из-за ленивой загрузку страницы. Если бы я юзал getByTestId, то ничего бы не получилось
		const page = await screen.findByTestId('MainPage')
		expect(page).toBeInTheDocument()
	})

})
