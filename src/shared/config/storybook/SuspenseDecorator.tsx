import { Story } from '@storybook/react'
import { Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
// eslint-disable-next-line react/display-name
// eslint-disable-next-line
export const SuspenseDecorator = (StoryComponent: Story) => {
	return (
		<Suspense fallback={<Loader />}>
			<StoryComponent />
		</Suspense>
	)
}
