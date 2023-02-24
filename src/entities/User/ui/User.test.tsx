// import { fireEvent, screen } from "@testing-library/react"
// import { componentRender } from "shared/lib/tests/componentRender"
// import { Counter } from "./User"

// describe('Counter.test', () => {
// 	test('Counter component initial test', () => {
// 		componentRender(<Counter />, {
// 			initialState: { counter: { value: 5 } }
// 		})
// 		expect(screen.getByTestId('value-title')).toHaveTextContent('5')
// 	})
// 	test('Counter component initial test', () => {
// 		componentRender(<Counter />, {
// 			initialState: { counter: { value: 5 } }
// 		})
// 		const increment = screen.getByTestId('increment')
// 		fireEvent.click(increment)
// 		expect(screen.getByTestId('value-title')).toHaveTextContent('6')
// 	})
// 	test('Counter component initial test', () => {
// 		componentRender(<Counter />, {
// 			initialState: { counter: { value: 5 } }
// 		})
// 		const decrement = screen.getByTestId('decrement')
// 		fireEvent.click(decrement)
// 		expect(screen.getByTestId('value-title')).toHaveTextContent('4')
// 	})
// })