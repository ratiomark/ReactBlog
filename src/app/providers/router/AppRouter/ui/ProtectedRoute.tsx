import { getUserAuthData } from 'entities/User';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../../config/routeConfig/routeConfig';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const auth = useSelector(getUserAuthData)
	const location = useLocation()

	if (!auth) {
		return <Navigate to={RoutePath.MAIN} state={{ from: location }} replace />
	}
	return children
}