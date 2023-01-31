import { useContext } from "react";
import { ThemeContext, Theme, LOCAL_STORAGE_THEME_KEY } from "./ThemeContext";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);
  const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  const toggleTheme = () => {
    setTheme(newTheme)
  }
  return { theme, toggleTheme }
}