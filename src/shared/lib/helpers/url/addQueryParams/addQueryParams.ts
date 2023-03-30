export const getQueryParams = (params: OptionalRecord<string, string>) => {
	const searchParams = new URLSearchParams(window.location.search)
	Object.entries(params).forEach(([paramName, paramValue]) => {
		if (paramValue !== undefined) {
			searchParams.set(paramName, paramValue)
		}
	})
	return `?${searchParams.toString()}`
}
export const addQueryParams = (params: OptionalRecord<string, string>) => {
	window.history.pushState(null, '', getQueryParams(params))
}