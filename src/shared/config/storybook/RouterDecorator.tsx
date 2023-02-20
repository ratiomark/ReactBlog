import { Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line react/display-name
// eslint-disable-next-line
export const RouterDecorator = (story: () => Story) => {
	return (
		<BrowserRouter>
			{story()}
		</BrowserRouter>
	)
}

