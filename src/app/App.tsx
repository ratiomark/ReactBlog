import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router/AppRouter'
import { NavBar } from '@/widgets/NavBar'
import { Sidebar } from '@/widgets/Sidebar'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted, initAuthData } from '@/entities/User'
import { useTheme } from '@/shared/context/useTheme'
import clsx from 'clsx'
import { ToggleFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts'




export const App = () => {
	const { theme } = useTheme()
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()

	useEffect(() => {

		dispatch(initAuthData())

	}, [dispatch, userMounted])

	if (!userMounted) return <LoaderWidget />

	return (
		<ToggleFeatures
			name='isAppRedesigned'

			off={
				<div className={clsx('app', theme)}>
					<Suspense fallback={<LoaderWidget />}>
						<NavBar />
						<div className='content-page'>
							<Sidebar />
							<AppRouter />
						</div>
					</Suspense>
				</div>
			}

			on={
				<div className={clsx('app_redesigned', theme)}>
					<Suspense fallback={<LoaderWidget />}>
						<MainLayout
							header={<NavBar />}
							content={<AppRouter />}
							sidebar={<Sidebar />}
							toolbar={<div>ToolBar yeah!!</div>}
						/>
					</Suspense>
				</div>
			}
		/>
	)
}
