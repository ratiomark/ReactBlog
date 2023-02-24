import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import cls from "./LoginModal.module.scss"

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
	const { className, isOpen, onClose } = props
	const { t } = useTranslation()

	return (
		<Modal className={classNames(cls.LoginModal, {}, [className])}
			// isOpen={true}
			isOpen={isOpen}
			// lazy
			onClose={onClose}
		>
			<LoginForm isOpen={isOpen} />
		</Modal>
	)
}
