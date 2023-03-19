// то что возвращает бекэнд
export interface User{
	id: string
	username: string
	avatar?: string
}

// а это интрефейс для стейта, чтобы описать кусок стора?
// если authData пустая, то юзер не авторизован, а если не пуст, то значит авторизован
export interface UserSchema{
	authData?: User

	_mounted: boolean
}