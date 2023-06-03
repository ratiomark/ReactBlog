import { useJsonSettings } from '@/entities/User';
import { ThemeContext } from '@/shared/context/ThemeContext';
import { Theme } from '@/shared/types/Theme';
import { ReactNode, useEffect, useMemo, useState } from 'react'

// initialTheme нужен для декораторов, в проде он не будет использоваться вообще
interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode
}

export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {

	const { theme: themeFromUser } = useJsonSettings()

	const [isThemeInited, setIsThemeInited] = useState(false)
	const [theme, setTheme] = useState<Theme>(themeFromUser || initialTheme || Theme.LIGHT);

	useEffect(() => {
		if (!isThemeInited && themeFromUser) {
			setTheme(themeFromUser)
			setIsThemeInited(true)
		}
	}, [themeFromUser, isThemeInited])

	const defaultProps = useMemo(() => ({
		theme: theme,
		setTheme: setTheme,
	}), [theme])

	// useEffect(() => {
		// document.body.className = theme
	// }, [theme])

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	)
}

