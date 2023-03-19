type ArticleBlockType = 'CODE' | 'IMAGE' | 'TEXT'

export interface ArticleBase {
	id: string
	type: ArticleBlockType
}

export interface ArticleTextBlock extends ArticleBase {
	title?: string
	paragraphs: string[]
	type: 'TEXT'
}

export interface ArticleImageBlock extends ArticleBase {
	src: string
	title?: string
	type: 'IMAGE'
}

export interface ArticleCodeBlock extends ArticleBase {
	code: string
	type: 'CODE'
}


export type ArticleBlock = ArticleTextBlock
	| ArticleImageBlock
	| ArticleCodeBlock

export type ArticleType = 'IT'
	| 'SCIENCE'
	| 'ECONOMICS'

export interface Article {
	id: string
	title: string
	subtitle: string
	img: string
	views: number
	createdAt: string
	type: ArticleType[]
	blocks: ArticleBlock[]
}