import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { ThemeContext } from '@/shared/context/ThemeContext';
import { Theme } from '@/shared/types/Theme';
import { ReactNode, useEffect, useMemo, useState } from 'react'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode
}

export const ThemeProvider = ({ children, initialTheme = defaultTheme }: ThemeProviderProps) => {

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

