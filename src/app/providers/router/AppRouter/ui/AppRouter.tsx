import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "app/providers/router/config/routeConfig/routeConfig";


export const AppRouter = () => {
	return (
		<Suspense fallback={<div>Loading.....</div>}>
			<Routes>
				{Object.values(routeConfig).map(({ path, element }) => (
					<Route
						key={path}
						path={path}
						element={<div className="page-wrapper">{element}</div>}
					/>
				))}
			</Routes>
		</Suspense>
	)
}


