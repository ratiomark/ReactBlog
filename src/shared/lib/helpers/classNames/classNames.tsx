type Mods = Record<string, boolean | string | undefined>;

export function classNames(
	cls?: string,
	mods: Mods = {},
	additional: Array<string | undefined> = []
): string {
	return [
		cls,
		...Object.entries(mods)
			.filter(([className, value]) => Boolean(value))
			.map(([className, value]) => (className)),
		...additional.filter(Boolean)
	]
		.join(' ')
}
// export const classNames = (cls?: string, mods?: Mods, additional?: string[]): string => {
//   const result: string[] = []

//   cls ? result.push(cls) : null

//   let modsFiltered;

//   if (mods) {
//     modsFiltered = Object.entries(mods)
//       .filter(([className, value]) => Boolean(value))
//       .map(([className, value]) => className)
//   }

//   modsFiltered?.length > 0 ? result.push(...modsFiltered) : null

//   additional ? result.push(...additional) : null

//   return result.join(' ')

// }