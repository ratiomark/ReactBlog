import { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { AppRouter } from './providers/router/AppRouter'
import { NavBar } from 'widgets/NavBar'
import { Sidebar } from 'widgets/Sidebar'
import icon from 'shared/assets/icon/abyss.jpg'
import icon2 from 'shared/assets/icon/768px-Sign-check-icon.png'
import { LoaderWidget } from 'widgets/LoaderWidget/LoaderWidget'
import { userActions } from 'entities/User'
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted } from 'entities/User'




export const App = () => {
	const dispatch = useAppDispatch()
	const userMounted = useSelector(getUserMounted)
	
	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])

	return (
		<div className={classNames('app', {}, [])}>
			<Suspense fallback={<LoaderWidget />}>
				<NavBar />
				<div className='content-page'>
					<Sidebar />
					{userMounted
						? <AppRouter />
						: null
					}
				</div>
			</Suspense>
		</div>
	)
}
