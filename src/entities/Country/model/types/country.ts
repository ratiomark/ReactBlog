
export const Country = {
	USA: 'USA',
	Russia: 'Russia'
} as const

// export type Country = 'USA'| 'Russia'
export type Country = keyof typeof Country