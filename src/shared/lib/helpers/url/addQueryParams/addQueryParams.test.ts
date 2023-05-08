import { getQueryParams } from './addQueryParams'

describe('shared/lib/helpers/url/addQueryParams', () => {
	test('test with one params', () => {
		const params = getQueryParams({
			test: 'value'
		})
		expect(params).toBe('?test=value')
	});
	test('test with two params', () => {
		const params = getQueryParams({
			test: 'value',
			test2: 'value2'
		})
		expect(params).toBe('?test=value&test2=value2')
	});
	test('test with undefined', () => {
		const params = getQueryParams({
			test: 'value',
			test2: undefined
		})
		expect(params).toBe('?test=value')
	});

})
