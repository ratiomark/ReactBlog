
type Mods = Record<string, boolean | string>;


export const classNames = (cls?: string, mods?: Mods, additional?: string[]): string => {
  return [
    cls,
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className),
    ...additional
  ].join(' ')
}

console.log(classNames('btn', { 'red': true, blue: false, green: true }, ['a', 'b']))
