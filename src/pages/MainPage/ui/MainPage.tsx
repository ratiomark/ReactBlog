import { Counter } from 'entities/Counter'
import React from 'react'
import { BugButton } from 'shared/ui/BugButton/BugButton'

const MainPage = () => {
	return (
		<div>
			MainPage
			<Counter />
			<BugButton />
		</div>
	)
}
export default MainPage
