import { FeatureFlags } from '@/shared/types/FeatureFlags';
import { ReactElement, ReactNode } from 'react';
import { getFeatureFlag } from '../setGetFeatureFlag';

interface ToggleFeaturesProps {
	name: keyof FeatureFlags
	on: ReactElement
	off: ReactElement
}

// компоненет для переключения фич, который можно юзать в jsx
export function ToggleFeatures(props: ToggleFeaturesProps) {
	const { name, on, off } = props

	if (getFeatureFlag(name)) {
		return on
	}

	return off
}