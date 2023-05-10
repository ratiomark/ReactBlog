import cls from './ThemeSwitcher.module.scss'
import IconTheme from '@/shared/assets/icon/theme-dark-1.svg'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import { memo, useCallback } from 'react'
import { useTheme } from '@/shared/context/useTheme'
import { Theme } from '@/shared/types/Theme'
import clsx from 'clsx'
import { saveJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'

interface ThemeSwitcherProps {
	className?: string
}
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme()
	const dispatch = useAppDispatch()

	const handleToggleTheme = useCallback(() => {
		toggleTheme((newTheme) => {
			dispatch(saveJsonSettings({ theme: newTheme }))
		})
	}, [toggleTheme, dispatch])

	return (
		<Button
			className={clsx(cls.ThemeSwitcher, {}, [className])}
			variant={ButtonVariant.clear}
			onClick={handleToggleTheme}>

			{theme === Theme.DARK
				? <IconTheme className={cls.dark} />
				: <IconTheme className={cls.light} />}
		</Button>
	)
})
