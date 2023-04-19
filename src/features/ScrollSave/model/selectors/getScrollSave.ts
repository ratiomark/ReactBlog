import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUIScroll = (state: StateSchema) => state.ui.scroll
export const getUIScrollByPath = createSelector(
	[
		getUIScroll,
		//эту функцию нужно будет передавать, когда я буду использовать селектор. То есть я создал динамический селектор, который принимаает путь и возвращает позицию скролла для этого пути(если так иммется в стейте)
		(state: StateSchema, pathFromOutside: string) => pathFromOutside
	],
	(scrollFromSelector, pathFromOutside) => scrollFromSelector[pathFromOutside] || 0
)