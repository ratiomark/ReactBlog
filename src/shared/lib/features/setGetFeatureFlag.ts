import { FeatureFlags } from '@/shared/types/FeatureFlags';

let featureFlag: FeatureFlags = {}

// const defaultFeatures: FeatureFlags = {
// 	isAppRedesigned:
// 		localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new' || localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === null,
// };

// В противном случае, когда отсутствует флаг при первой загрузке идет сравнение
// null === 'new' is false и поэтому возвращается в итоге фолс, даже если мы поставим, как сделал Тимур в уроке:
// export function getFeatureFlag(flag: keyof FeatureFlags) {
// 	return featureFlags[flag] ?? true;
// }

// эта функция будет использоваться, чтобы засетать featureFlag пользователя. То есть в бд есть инфа, у кого какие фичи работают, при входе я подтягиваю эти данные и в слайсе с помощью этой функции сетаю эти флаги
export const setFeatureFlag = (newFeatureFlag?: FeatureFlags) => {
	if (newFeatureFlag) {
		featureFlag = newFeatureFlag
	}
}

// эта функция будет использоваться в toggleFeatures, чтобы получить значение флага по конкретной фиче.
export const getFeatureFlag = (flag: keyof FeatureFlags) => {
	return featureFlag[flag]
}
