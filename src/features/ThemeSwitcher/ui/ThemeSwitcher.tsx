import cls from './ThemeSwitcher.module.scss'
import IconTheme from '@/shared/assets/icon/theme-dark-1.svg'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import { memo } from 'react'
import { useTheme } from '@/shared/context/useTheme'
import { Theme } from '@/shared/types/Theme'
import clsx from 'clsx'

interface ThemeSwitcherProps {
	className?: string
}
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme()

	return (
		<Button
			className={clsx(cls.ThemeSwitcher, {}, [className])}
			variant={ButtonVariant.clear}
			onClick={toggleTheme}>
			
			{theme === Theme.DARK
				? <IconTheme className={cls.dark} />
				: <IconTheme className={cls.light} />}
		</Button>
	)
})
