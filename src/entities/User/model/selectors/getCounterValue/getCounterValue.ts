// import { createSelector } from '@reduxjs/toolkit'
// import { CounterSchema } from '../../types/user';
// import { getCounter } from "../getCounter/getCounter";

// // const selectShopItems = state => state.shop.items
// // const selectTaxPercent = state => state.shop.taxPercent

// // const selectSubtotal = createSelector(selectShopItems, items =>
// // 	items.reduce((subtotal, item) => subtotal + item.value, 0)
// // )

// // const selectTax = createSelector(
// // 	selectSubtotal,
// // 	selectTaxPercent,
// // 	(subtotal, taxPercent) => subtotal * (taxPercent / 100)
// // )
// // последний аргумент это функция, которая принимает в качестве параметров результаты прошлых селекторов
// export const getCounterValue = createSelector(getCounter, (counter: CounterSchema) => counter.value)