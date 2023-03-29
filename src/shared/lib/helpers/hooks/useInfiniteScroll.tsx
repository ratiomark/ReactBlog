import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
	callback?: () => void;
	triggerRef: MutableRefObject<HTMLElement>;
	wrapperRef?: MutableRefObject<HTMLElement>;
	isLoading?: boolean
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef, isLoading }: UseInfiniteScrollOptions) {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const wrapperElement = wrapperRef?.current;
		const triggerElement = triggerRef.current;

		if (callback && !isLoading) {
			const options = {
				root: wrapperElement,
				rootMargin: '0px',
				threshold: 1.0,
			};

			observer.current = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					callback();
				}
			}, options);

			observer.current.observe(triggerElement);
		}

		return () => {
			if (observer.current && triggerElement) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.current.unobserve(triggerElement);
			}
		};
	}, [callback, triggerRef, wrapperRef, isLoading]);
}

// import { MutableRefObject, useEffect, useRef } from 'react';

// export interface UseInfiniteScrollOptions {
// 	callback?: () => void;
// 	triggerRef: MutableRefObject<HTMLElement>;
// 	wrapperRef: MutableRefObject<HTMLElement>;
// 	isLoading?: boolean
// }

// export function useInfiniteScroll({ callback, wrapperRef, triggerRef, isLoading }: UseInfiniteScrollOptions) {
// 	// const observer = useRef<IntersectionObserver | null>(null);

// 	useEffect(() => {
// 		// if (__PROJECT__ !== 'storybook') {
// 		// const
// 		let observer: IntersectionObserver | null;
// 		const wrapperElement = wrapperRef.current;
// 		const triggerElement = triggerRef.current;
// 		console.log('in HOOK, ', isLoading)
// 		if (callback && !isLoading) {
// 			const options = {
// 				root: document,
// 				// rootMargin: '0px	',
// 				rootMargin: '100px 0px 0px 0px',
// 				threshold: 0.2,
// 			};

// 			observer = new IntersectionObserver(([entry]) => {
// 				// console.log(entry)
// 				if (entry.isIntersecting) {
// 					console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
// 					callback();
// 				}
// 			}, options);

// 			observer.observe(triggerElement);
// 		}

// 		return () => {
// 			if (observer && triggerElement) {
// 				// eslint-disable-next-line react-hooks/exhaustive-deps
// 				observer.unobserve(triggerElement);
// 			}
// 		};
// 		// }
// 	}, [callback, triggerRef, wrapperRef, isLoading]);
// }

// import { useEffect } from '@storybook/addons'
// import { MutableRefObject, useRef } from 'react'

// interface UseInfiniteScrollOptions {
// 	callback?: () => void
// 	triggerRef: MutableRefObject<HTMLElement>
// 	wrapperRef: MutableRefObject<HTMLElement>
// }
// export const useInfiniteScroll = ({ callback, triggerRef, wrapperRef }: UseInfiniteScrollOptions) => {
// 	const observer = useRef<IntersectionObserver | null>()
// 	useEffect(() => {
// 		if (__PROJECT__ !== 'storybook') {
// 			const wrapperElement = wrapperRef.current
// 			const triggerElement = triggerRef.current
// 			if (callback) {
// 				const options = {
// 					//root элемент в котором находится скролл. Поскольку я указываю рут явно, я должен убедится, что элемент за которым я буду наблюдать будет непосредтсвенным вложенным элементом в root, именно по этой причине дефолтное значение рута document
// 					root: wrapperElement,
// 					rootMargin: '0px',
// 					threshold: 1.0
// 				}

// 				// нужно сделать так, чтобы вызывался коллбек в тот момент когда на экране появляся элемент за которым мы следим
// 				// Коллбек(первый аргумент) у IntersectionObserver в качестве первого аргумента принимает массив элементов(entries) за которыми происходит наблюдение
// 				// Значит с помощью деструктуризации я могу достать первый элемент, ведь я слежу только за одним элементом
// 				observer.current = new IntersectionObserver(([entry]) => {
// 					// вызываю коллбек, только когда происходит пересечение
// 					if (entry.isIntersecting) {
// 						callback()

// 					}
// 					// callback()
// 				}, options)
// 				observer.current.observe(triggerElement)

// 				return () => {
// 					if (observer.current && triggerElement) {
// 						//eslint-disable-next-line
// 						observer.current.unobserve(triggerElement)
// 					}
// 				}
// 			}
// 		}
// 	}, [triggerRef, wrapperRef, callback])

// }