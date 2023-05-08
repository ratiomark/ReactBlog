import { FeatureFlags } from '@/shared/types/FeatureFlags';

let featureFlag: FeatureFlags

export const setFeatureFlag = (newFeatureFlag?: FeatureFlags) => {
	if (newFeatureFlag) {
		featureFlag = newFeatureFlag
	}
}

export const getFeatureFlag = (flag: keyof FeatureFlags) => {
	return featureFlag[flag]
}
