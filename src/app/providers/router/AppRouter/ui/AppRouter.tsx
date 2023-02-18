import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routeConfig } from 'app/providers/router/config/routeConfig/routeConfig'
import { LoaderWidget } from 'widgets/LoaderWidget/LoaderWidget'

export const AppRouter = () => {
	return (
		<Suspense fallback={<LoaderWidget />}>
			<Routes>
				{Object.values(routeConfig).map(({ path, element }) => (
					<Route
						key={path}
						path={path}
						element={<div className='page-wrapper'>{element}</div>}
					/>
				))}
			</Routes>
		</Suspense>
	)
}
