import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { favouritesSlice } from '../features/favourites';
import { saveToLocalStorage } from '../features/servises/saveGetFromLocalStorage';
import { cartSlice } from '../features/cart';

const rootReducer = combineSlices(favouritesSlice, cartSlice);

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  const state = store.getState();

  saveToLocalStorage('favourites', state.favourites);
  saveToLocalStorage('cart', state.cart.cartList);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
