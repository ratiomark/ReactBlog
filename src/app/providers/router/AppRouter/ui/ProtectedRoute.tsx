import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { obtainForbiddenPage, obtainRouteMain } from '../../config/routeConfig/routeConfig';

interface ProtectedRouteProps {
	children: JSX.Element
	roles?: UserRole[]
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
	const auth = useSelector(getUserAuthData)
	const location = useLocation()
	const userRoles = useSelector(getUserRoles)

	const hasRequiredRole = useMemo(() => {
		if (!roles) return true
		return roles.some(requiredRole => {
			const hasRole = userRoles?.includes(requiredRole)
			// console.log(requiredRole, roles, hasRole)
			return hasRole
		})
	}, [roles, userRoles])

	

	if (!auth) {
		return <Navigate to={obtainRouteMain()} state={{ from: location }} replace />
	}

	// если это условие будет перед auth, то когда админ разлогиниться со страницы админки, то он попадет на страницу ForbiddenPage
	if (!hasRequiredRole) {
		return <Navigate to={obtainForbiddenPage()} state={{ from: location }} replace />
	}

	return children
}