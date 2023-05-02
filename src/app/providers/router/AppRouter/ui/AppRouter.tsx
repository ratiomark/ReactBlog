import { Suspense, useCallback, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppRouteProps, routeConfig } from '../../config/routeConfig/routeConfig'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {

	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		const { path, authOnly, element, wrapper: Wrapper, roles } = route

		const finalElement = (
			<Suspense fallback={<LoaderWidget />}>
				{Wrapper
					? <Wrapper>{element}</Wrapper>
					: element
				}
			</Suspense>
		)
		return (
			<Route
				key={path}
				path={path}
				element={authOnly
					? <ProtectedRoute roles={roles}>{finalElement}</ProtectedRoute>
					: finalElement
				}
			/>)
	}, [])

	const routes = Object.values(routeConfig).map(renderWithWrapper)

	return (
		<Suspense fallback={<LoaderWidget />}>
			<Routes>
				{routes}
			</Routes>
		</Suspense>
	)
}
