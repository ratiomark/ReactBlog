import { render, screen } from '@testing-library/react'
import { Button, ButtonVariant } from './Button'
describe('Button', () => {
	test('button test render', () => {
		render(<Button>TEST</Button>)
		expect(screen.getByText('TEST')).toBeInTheDocument()
	})
	test('button clear theme', () => {
		render(<Button variant={ButtonVariant.clear}>TEST</Button>)
		expect(screen.getByText('TEST')).toHaveClass('clear')
		screen.debug()
	})
})
