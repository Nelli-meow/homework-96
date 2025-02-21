import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ICocktailMutation, ICocktails } from '../../types';


export const fetchCocktailsThunk = createAsyncThunk(
  'cocktails/fetchCocktails',
  async () => {
    const cocktailsResponse = await axiosApi<ICocktails[]>('/cocktails');

    return cocktailsResponse.data || [];
  }
);

export const addNewCocktail = createAsyncThunk<void, { cocktail: ICocktailMutation, token: string }>(
  'cocktails/addNewCocktail',
  async ({ cocktail, token }) => {
    const formData = new FormData();

    const keys = Object.keys(cocktail) as (keyof ICocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktail[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/cocktails', formData, { headers: { 'Authorization': token } });
  }
);