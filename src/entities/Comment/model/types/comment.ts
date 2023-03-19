import { User } from 'entities/User'


export interface Comment {
	id: string
	user: User
	text: string
	isLoading: boolean
}


export interface CommentSchema {
	// [key: string]: string
	id: string
	// articleId: string
	// userId: string
	// text: string
}