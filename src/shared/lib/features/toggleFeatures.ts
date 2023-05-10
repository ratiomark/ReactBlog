import { FeatureFlags } from '@/shared/types/FeatureFlags';
import { getFeatureFlag } from './setGetFeatureFlag';

interface ToggleFeatures<T> {
	name: keyof FeatureFlags
	on: () => T
	off: () => T
}

// использует имя флага, чтобы подтянуть значение(true/false) и в зависимости от значени, возвращает либо on, либо off
// {name: 'isCounterEnabled, on:()=><Counter/>, off:()=><NewCounter/>}
// как видно выше, я могу передавать сразу компоненты, но конкретно эту функцию стоит использовать для значений/функций, а для работы с компонентами, есть отдельный компоненет ToggleFeatures, который можно поместить сразу в разметку
export function toggleFeatures<T>({ name, on, off }: ToggleFeatures<T>): T {
	if (getFeatureFlag(name)) {
		return on()
	}
	return off()
}