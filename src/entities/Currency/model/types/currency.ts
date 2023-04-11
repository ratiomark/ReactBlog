export const Currency = {
	rub: 'rub',
	usd: 'usd',
	eur: 'eur',
} as const

export type Currency = keyof typeof Currency