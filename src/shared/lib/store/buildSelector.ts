import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';


// Этот тип описывает функцию-селектор, то есть то, что обычно кладется внутрь useSelector. При этом, нужно уметь передавать доп. аругменты, например id, поэтому я добавляю еще один аргумент-генерик.
type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T
type Hook<T, Args extends any[]> = (...args: Args) => T
type Result<T, Args extends any[]> = [Hook<T,Args>, Selector<T, Args>]

// функция будет возвращать хук который сразу возвращает что-то из стейта
export function buildSelector<T, Args extends any[]>(
	selector: Selector<T, Args>
): Result<T, Args> {
	// возвращает тоже самое что и useSelector((state: StateSchema)=> state.reducer.value))
	const useSelectorHook: Hook<T, Args> = (...args: Args) => {
		return useSelector((state: StateSchema) => selector(state, ...args))
	}

	// возвращаю хук который сразу возвращает что-то из стейта 
	// + сам селектор(state: StateSchema)=> state.reducer.value)
	return [useSelectorHook, selector]
}

// type Selector<T> = (state: StateSchema) => T
// type Result<T> = [()=>T, Selector<T>]

// // функция будет возвращать хук который сразу возвращает что-то из стейта
// export function buildSelector<T>(selector: Selector<T>): Result<T> {
	
// 	// возвращает тоже самое что и useSelector((state: StateSchema)=> state.reducer.value))
// 	const useSelectorHook = () => useSelector(selector)
	
// 	// возвращаю хук который сразу возвращает что-то из стейта 
// 	// + сам селектор(state: StateSchema)=> state.reducer.value)
// 	return [useSelectorHook, selector]
// }