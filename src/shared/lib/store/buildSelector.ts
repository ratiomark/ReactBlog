import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

type Selector<T> = (state: StateSchema) => T
type Result<T> = [()=>T, Selector<T>]

// функция будет возвращать хук который сразу возвращает что-то из стейта
export function buildSelector<T>(selector: Selector<T>): Result<T> {
	
	// возвращает тоже самое что и useSelector((state: StateSchema)=> state.reducer.value))
	const useSelectorHook = () => useSelector(selector)
	
	// возвращаю хук который сразу возвращает что-то из стейта 
	// + сам селектор(state: StateSchema)=> state.reducer.value)
	return [useSelectorHook, selector]
}