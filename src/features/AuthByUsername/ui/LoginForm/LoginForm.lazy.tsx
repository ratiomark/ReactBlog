import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';


export const LoginForm = lazy<FC<LoginFormProps>>(() => new Promise((resolve) => {
	setTimeout(
		() => resolve(import('./LoginForm'))
		, 1500)
}))