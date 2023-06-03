import clsx from 'clsx'
import IconThemeDeprecated from '@/shared/assets/icon/theme-dark-1.svg'
import IconTheme from '@/shared/assets/icons_redesigned/theme.svg'
import { Button, ButtonVariant } from '@/shared/ui/deprecated/Button/Button'
import { useTheme } from '@/shared/context/useTheme'
import { memo, useCallback } from 'react'
import { saveJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon/Icon'
import cls from './ThemeSwitcher.module.scss'

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
		<ToggleFeatures
			name='isAppRedesigned'
			off={
				<Button
					className={clsx(cls.ThemeSwitcher, {}, [className])}
					variant={ButtonVariant.clear}
					onClick={handleToggleTheme}>
					<IconDeprecated
						Svg={IconThemeDeprecated}
						width={40}
						height={40}
						className={cls.themeIcon}
					/>
				</Button>
			}

			on={
				<Icon
					Svg={IconTheme}
					clickable
					onClick={handleToggleTheme}
					className={clsx(cls.themeIcon, className)} />
			}
		/>

	)
})
