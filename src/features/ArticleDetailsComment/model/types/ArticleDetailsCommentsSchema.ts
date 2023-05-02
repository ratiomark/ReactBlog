import { Dictionary, EntityAdapter, EntityState } from '@reduxjs/toolkit'
import { CommentType } from '@/entities/Comment'

export interface ArticleDetailsCommentsSchema extends EntityState<CommentType> {
	isLoading: boolean
	error?: string

}
// export interface ArticleDetailsCommentsSchema {
// 	isLoading: boolean
// 	error?: string
// 	ids: string[]
// 	entities: Dictionary<CommentType>
// 	data?: Comment[]

// }