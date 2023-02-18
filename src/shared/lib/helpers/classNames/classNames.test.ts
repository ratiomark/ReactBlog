import { classNames } from 'shared/lib/helpers/classNames/classNames'

describe('classNames', () => {
	test('with only first param', () => {
		expect(classNames('someClass')).toBe('someClass');
	})
	test('with additional class', () => {
		const expected = 'someClass secondClass'
		expect(classNames('someClass', {}, ['secondClass'])).toBe(expected);
	})
	test('with mods class', () => {
		const expected = 'someClass hovered blurred secondClass'
		expect(classNames('someClass', { hovered: true, blurred: true }, ['secondClass'])).toBe(expected);
	})
	test('with mods class one false', () => {
		const expected = 'someClass blurred secondClass'
		expect(classNames('someClass', { hovered: false, red: false, blurred: true }, ['secondClass'])).toBe(expected);
	})
})