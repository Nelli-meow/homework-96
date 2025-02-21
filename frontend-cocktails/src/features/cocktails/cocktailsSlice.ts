import { createSlice } from '@reduxjs/toolkit';
import { ICocktails } from '../../types';
import { addNewCocktail, fetchCocktailsThunk, getOneCocktail, publishCocktail } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ICocktailsState {
  Cocktails: ICocktails[],
  oneCocktail: ICocktails | null,
  fetchCocktails: boolean,
  fetchCocktailById: boolean,
  isPublished: boolean,
  isLoading: boolean,
  createLoading: boolean,
}

const initialState: ICocktailsState = {
  Cocktails: [],
  oneCocktail: null,
  fetchCocktails: false,
  fetchCocktailById: false,
  isPublished: false,
  isLoading: false,
  createLoading: false,
};

export const selectCocktails = (state: RootState) => state.cocktails.Cocktails;
export const selectIsLoading = (state: RootState) => state.cocktails.isLoading;
export const selectIsCreateLoading = (state: RootState) => state.cocktails.createLoading;
export const selectCocktail  = (state: RootState) => state.cocktails.oneCocktail;

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktailsThunk.pending, (state) => {
        state.fetchCocktails = true;
        state.isLoading = true;
      })
      .addCase(fetchCocktailsThunk.fulfilled, (state, {payload: cocktails}) => {
        state.fetchCocktails = false;
        state.Cocktails = cocktails;
        state.isLoading = false;
      })
      .addCase(fetchCocktailsThunk.rejected, (state) => {
        state.fetchCocktails = false;
        state.isLoading = false;
      })

      .addCase(addNewCocktail.pending, (state) => {
        state.fetchCocktails = true;
        state.createLoading = true;
      })
      .addCase(addNewCocktail.fulfilled, (state) => {
        state.fetchCocktails = false;
        state.createLoading = false;
      })
      .addCase(addNewCocktail.rejected, (state) => {
        state.fetchCocktails = false;
        state.createLoading = false;
      })

      .addCase(publishCocktail.pending, (state) => {
        state.isPublished = true;
      })
      .addCase(publishCocktail.fulfilled, (state, {payload}) => {
        state.isPublished = false;
        state.Cocktails = state.Cocktails.map((cocktail) =>
          cocktail._id === payload._id ? {...cocktail, isPublished: true} : cocktail,
        );
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.isPublished = false;
      })

      .addCase(getOneCocktail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCocktail.fulfilled, (state, {payload: oneCocktail}) => {
        state.oneCocktail = oneCocktail;
        state.isLoading = false;
      })
      .addCase(getOneCocktail.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;