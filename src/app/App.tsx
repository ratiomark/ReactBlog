import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router/AppRouter'
import { NavBar } from '@/widgets/NavBar'
import { Sidebar } from '@/widgets/Sidebar'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted, initAuthData } from '@/entities/User'




export const App = () => {
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()

	useEffect(() => {

		dispatch(initAuthData())

	}, [dispatch, userMounted])

	if (!userMounted) return <LoaderWidget />

	return (
		<div className={'app'}>
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
