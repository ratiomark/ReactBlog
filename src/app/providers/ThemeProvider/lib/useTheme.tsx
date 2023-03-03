import { useContext } from 'react';
import { ThemeContext, Theme, LOCAL_STORAGE_THEME_KEY } from './ThemeContext';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export const useTheme = (): UseThemeResult => {
	const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		let newTheme: Theme
		switch (theme) {
		case Theme.DARK:
			newTheme = Theme.LIGHT
			break;
		case Theme.LIGHT:
			newTheme = Theme.DARK
			break;

		default:
			newTheme = Theme.LIGHT
		}
		// = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
		setTheme?.(newTheme)
		document.body.className = newTheme
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
	}
	return { theme, toggleTheme }
}
