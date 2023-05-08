import { FeatureFlags } from '@/shared/types/FeatureFlags'

export const UserRole = {
	ADMIN: 'ADMIN',
	USER: 'USER',
	MANAGER: 'MANAGER',
} as const

export type UserRole = keyof typeof UserRole

// то что возвращает бекэнд
export interface User {
	id: string
	username: string
	avatar?: string
	role?: UserRole[]
	features?: Partial<FeatureFlags>
}

// а это интрефейс для стейта, чтобы описать кусок стора?
// если authData пустая, то юзер не авторизован, а если не пуст, то значит авторизован
export interface UserSchema {
	authData?: User

	_mounted: boolean
}