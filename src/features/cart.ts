/* eslint-disable @typescript-eslint/indent */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from './servises/saveGetFromLocalStorage';
import { CartElement } from '../modules/shared/types/CartElement';

type State = {
  cartList: CartElement[];
  cartFilled: boolean;
};

const initialState: State = {
  cartList: loadFromLocalStorage('cart'),
  cartFilled: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set(state, action: PayloadAction<CartElement[]>) {
      return {
        ...state,
        cartList: action.payload,
      };
    },

    add(state, action: PayloadAction<CartElement>) {
      const inCart = state.cartList.find(
        product => product.id === action.payload.id,
      );

      if (!inCart) {
        return {
          ...state,
          cartList: [
            ...state.cartList,
            {
              id: action.payload.id,
              quantity: 1,
              product: action.payload.product,
            },
          ],
        };
      }

      return {
        ...state,
        cartList: [...state.cartList].map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      };
    },

    remove(state, action: PayloadAction<string>) {
      return {
        ...state,
        cartList: [...state.cartList].filter(
          product => product.id !== action.payload,
        ),
      };
    },

    increase(state, action: PayloadAction<string>) {
      return {
        ...state,
        cartList: [...state.cartList].map(product =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      };
    },

    decrease(state, action: PayloadAction<string>) {
      return {
        ...state,
        cartList: [...state.cartList].map(product =>
          product.id === action.payload
            ? {
                ...product,
                quantity:
                  product.quantity > 1
                    ? product.quantity - 1
                    : product.quantity,
              }
            : product,
        ),
      };
    },

    clear() {
      return {
        cartList: [],
        cartFilled: false,
      };
    },

    isFilled(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        cartFilled: action.payload,
      };
    },
  },
});

export const { set, add, remove, increase, decrease, clear, isFilled } =
  cartSlice.actions;

export default cartSlice.reducer;
