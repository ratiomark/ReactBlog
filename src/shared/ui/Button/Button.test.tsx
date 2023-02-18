import { render, screen } from '@testing-library/react'
import { Button, ThemeButton } from './Button'
describe('Button', () => {
	test('button test render', () => {
		render(<Button>TEST</Button>)
		expect(screen.getByText('TEST')).toBeInTheDocument()
	})
	test('button clear theme', () => {
		render(<Button theme={ThemeButton.clear}>TEST</Button>)
		expect(screen.getByText('TEST')).toHaveClass('clear')
		screen.debug()
	})
})
