import { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { AppRouter } from './providers/router/AppRouter'
import { NavBar } from 'widgets/NavBar'
import { Sidebar } from 'widgets/Sidebar'
import icon from 'shared/assets/icon/abyss.jpg'
import icon2 from 'shared/assets/icon/768px-Sign-check-icon.png'
import { LoaderWidget } from 'widgets/LoaderWidget/LoaderWidget'
import { useDispatch } from 'react-redux'
import { userActions } from 'entities/User'




export const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])

	return (
		<div className={classNames('app', {}, [])}>
			<Suspense fallback={<LoaderWidget />}>
				<NavBar />
				<div className='content-page'>
					<Sidebar />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	)
}
