import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import cls from "./ThemeSwitcher.module.scss"
import IconDark from 'shared/assets/icon/theme-dark-1.svg'
import IconLight from 'shared/assets/icon/theme-light-1.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			theme={ThemeButton.clear}
			className={classNames(cls.ThemeSwitcher, {}, [className])}
			onClick={toggleTheme}
		>
			{theme === Theme.DARK ? <IconDark /> : <IconLight />}
		</Button>
	)
}