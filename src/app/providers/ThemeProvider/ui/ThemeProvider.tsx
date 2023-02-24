import { FC, useEffect, useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
	initialTheme?: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme = defaultTheme }) => {

	const [theme, setTheme] = useState<Theme>(initialTheme);

	const defaultProps = useMemo(() => ({
		theme: theme,
		setTheme: setTheme,
	}), [theme])

	useEffect(() => {
		document.body.className = initialTheme
	}, [initialTheme])

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	)
}

