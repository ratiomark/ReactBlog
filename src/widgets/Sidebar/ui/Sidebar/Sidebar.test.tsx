import { fireEvent, render, screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender'
import { Sidebar } from './Sidebar'
describe('Sidebar', () => {
	test('sidebar test render', () => {
		componentRender(<Sidebar />)
		expect(screen.getByTestId('sidebar')).toBeInTheDocument()
	})
	test('sidebar toggled', () => {
		componentRender(<Sidebar />)
		const toggleButton = screen.getByTestId('toggle-sidebar')
		fireEvent.click(toggleButton)
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
	})
})
