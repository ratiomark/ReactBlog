import { render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
describe('Sidebar', () => {
	test('sidebar test render', () => {
		render(<Sidebar/> )
		expect(screen.getByTestId('sidebar')).toBeInTheDocument()
	})
	// test('button class', () => {
	// 	render(<Button theme={ThemeButton.clear}>TEST</Button>)
	// 	expect(screen.getByText('TEST')).toHaveClass('clear')
	// 	screen.debug()
	// })
})
