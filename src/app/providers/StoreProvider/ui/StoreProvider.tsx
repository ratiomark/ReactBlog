import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
	asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const {
		children,
		initialState,
		asyncReducers
	} = props

	const store = createReduxStore(initialState, asyncReducers)
	console.log('render!!!!!!')
	return (
		<Provider store={store}>
			{children}
		</Provider>

	)
}