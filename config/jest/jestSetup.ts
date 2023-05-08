// указываем какие штуки нужно подтягивать во время тестирования
import '@testing-library/jest-dom'
import { clear } from 'console';
import 'regenerator-runtime/runtime'
interface store {
	[key: string]: any
}
const localStorageMock = (function () {
	let store: store = {};

	return {
		getItem(key: string) {
			return store[key];
		},

		setItem(key: string, value: any) {
			store[key] = value;
		},

		clear() {
			store = {};
		},

		removeItem(key: string) {
			delete store[key];
		},

		getAll() {
			return store;
		},
	};
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
global.localStorage