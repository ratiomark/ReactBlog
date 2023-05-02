import { createContext } from 'react';
import { Theme } from '../types/Theme';


// export enum Theme {
// 	LIGHT = 'app_light_theme',
// 	DARK = 'app_dark_theme'
// }


export interface ThemeContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({

})


