import { Story } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
// eslint-disable-next-line react/display-name
// eslint-disable-next-line
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
	(
		<div className={`app ${theme}`}>
			<StoryComponent />
		</div>
	)
// можно и так, но нунжо подтягивать тип Story из @storybook/api
// export const ThemeDecorator = (story: () => Story) => {
// 	return (
// 		<div>
// 			{story()}
// 		</div>
// 	)
// }
