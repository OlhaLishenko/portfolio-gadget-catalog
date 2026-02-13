import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from './servises/saveGetFromLocalStorage';

const initialState: string[] = loadFromLocalStorage('favourites');

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    set(_, action: PayloadAction<string[]>) {
      return action.payload;
    },

    add(favourites, action: PayloadAction<string>) {
      if (!favourites.includes(action.payload)) {
        favourites.push(action.payload);
      }
    },

    remove(favourites, action: PayloadAction<string>) {
      return favourites.filter(i => i !== action.payload);
    },
  },
});

export const { set, add, remove } = favouritesSlice.actions;

export default favouritesSlice.reducer;
