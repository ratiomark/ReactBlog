import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../types/JsonSettings';

// специально создаю объект отдельной коснтантой, чтобы передать в селектор как запаску, потому что если передам там объект, то он будет создаваться каждый раз по новой, а const статична
const defaultJsonSettings: JsonSettings = {}

export const [useJsonSettings, getJsonSettings] = buildSelector(state => state.user?.authData?.jsonSettings ?? defaultJsonSettings)

// // как раз случай, когда я использую и селектор и доп. аргумент, чтобы достать определенную часть настроек
// export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
// 	(state, key: keyof JsonSettings) => state.user.authData?.jsonSettings?.[key],
// )
