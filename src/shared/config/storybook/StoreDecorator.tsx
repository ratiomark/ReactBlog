import { DeepPartial } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
// eslint-disable-next-line react/display-name
// eslint-disable-next-line
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
	<StoreProvider initialState={state as StateSchema}>
		<StoryComponent />
	</StoreProvider>
)
