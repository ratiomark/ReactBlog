import { Theme } from '@/shared/types/Theme';

export interface JsonSettings {
	theme?: Theme
	isFirstVisit?: boolean
	settingsPageHasBeenOpen?: boolean
}