import { getLoginState } from '../../Model/selectors/getLoginState/getLoginState'
import { loginActions, loginReducer } from '../../Model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useStore } from 'react-redux'
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'
import { loginUserByUserName } from 'features/AuthByUsername/Model/services/loginByUserName/loginByUserName'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import {
	ReducersList,
	useAsyncReducer,
} from 'shared/lib/helpers/hooks/useAsyncReducer'

export interface LoginFormProps {
	className?: string
	isOpen?: boolean
}

// Отдельно выносим редьюсеры от комопнента, чтобы лишний раз не создавать объект с редьюсерами, если так не сделать, то каждый раз при монтировании компонента LoginForm будет создаваться новый объект с редьюсерами и передаваться в хук, лучше сделать такой объект один раз
const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

// eslint-disable-next-line
const LoginForm = memo(({ className, isOpen }: LoginFormProps) => {
	const { t } = useTranslation()
	const { dispatch, store } = useAsyncReducer({
		reducers: initialReducers,
	})

	const {
		username = '',
		password = '',
		error = null,
		isLoading = false,
	} = useSelector(getLoginState) || {
		username: '',
		password: '',
		error: null,
		isLoading: false,
	}

	const onChangeUserName = useCallback(
		(value: string) => {
			dispatch(loginActions.setUserName(value))
		},
		[dispatch]
	)

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value))
		},
		[dispatch]
	)

	const onClickLoginButton = useCallback(() => {
		dispatch(loginUserByUserName({ username, password }))
	}, [dispatch, username, password])

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Text text={t('login form in modal')} />

			<div className={cls.inputWrapper}>
				{error && <Text text={error} variant={TextVariant.error} />}
				<label className={cls.label} htmlFor='userName'>
					{t('enter userName')}
				</label>
				<Input
					autoFocus
					type='text'
					id='userName'
					value={username}
					onChange={onChangeUserName}
				/>
				<label className={cls.label} htmlFor='password'>
					{t('enter password')}
				</label>
				<Input
					type='text'
					id='password'
					value={password}
					onChange={onChangePassword}
				/>
				<Button
					variant='outline'
					size='size_m'
					className={cls.loginBtn}
					onClick={onClickLoginButton}
					disabled={isLoading}
				>
					{t('log in')}
				</Button>
			</div>
		</div>
	)
})

export default LoginForm
