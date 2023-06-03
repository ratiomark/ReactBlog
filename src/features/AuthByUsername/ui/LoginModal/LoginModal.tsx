import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm.lazy';
import cls from './LoginModal.module.scss'
import clsx from 'clsx';

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props

	const { t } = useTranslation()

	return (
		<Modal className={clsx(cls.LoginModal,  [className])}
			isOpen={isOpen}
			lazy
			onClose={onClose}
		>
			<Suspense fallback={<Loader/>}>
				<LoginForm onSuccess={onClose} isOpen={isOpen} />
			</Suspense>
		</Modal>
	)
}
