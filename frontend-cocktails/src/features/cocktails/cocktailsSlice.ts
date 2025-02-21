import { createSlice } from '@reduxjs/toolkit';
import { ICocktails } from '../../types';
import { addNewCocktail, fetchCocktailsThunk } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ICocktailsState {
  Cocktails: ICocktails[],
  fetchCocktails: boolean,
  fetchCocktailById: boolean,
  isPublished: boolean,
  isLoading: boolean,
}

const initialState: ICocktailsState = {
  Cocktails: [],
  fetchCocktails: false,
  fetchCocktailById: false,
  isPublished: false,
  isLoading: false,
};

export const selectCocktails = (state: RootState) => state.cocktails.Cocktails;
export const selectIsLoading = (state: RootState) => state.cocktails.isLoading;

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchCocktailsThunk.pending, (state) => {
        state.fetchCocktails = true;
      })
      .addCase(fetchCocktailsThunk.fulfilled, (state, {payload: cocktails}) => {
        state.fetchCocktails = false;
        state.Cocktails = cocktails;
      })
      .addCase(fetchCocktailsThunk.rejected, (state) => {
        state.fetchCocktails = false;
      })

      .addCase(addNewCocktail.pending, (state) => {
        state.fetchCocktails = true;
      })
      .addCase(addNewCocktail.fulfilled, (state) => {
        state.fetchCocktails = false;
      })
      .addCase(addNewCocktail.rejected, (state) => {
        state.fetchCocktails = false;
      });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;