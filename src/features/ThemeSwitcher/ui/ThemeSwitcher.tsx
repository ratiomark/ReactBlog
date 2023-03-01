import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import IconTheme from 'shared/assets/icon/theme-dark-1.svg'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { memo } from 'react'

interface ThemeSwitcherProps {
	className?: string
}
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme()

	return (
		<Button variant={ButtonVariant.clear} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
			{theme === Theme.DARK ? <IconTheme className={cls.dark} /> : <IconTheme className={cls.light} />}
		</Button>
	)
})
