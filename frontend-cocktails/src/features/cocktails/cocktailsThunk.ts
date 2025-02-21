import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { GlobalError, ICocktailMutation, ICocktails } from '../../types';
import { isAxiosError } from 'axios';


export const fetchCocktailsThunk = createAsyncThunk(
  'cocktails/fetchCocktails',
  async () => {
    const cocktailsResponse = await axiosApi<ICocktails[]>('/cocktails');

    return cocktailsResponse.data || [];
  }
);

export const getOneCocktail = createAsyncThunk<ICocktails, string>(
  'cocktails/getOneCocktail',
  async (id: string) => {
    const response = await axiosApi<ICocktails>(`/cocktails/${id}`);
    return response.data;
  });


export const addNewCocktail = createAsyncThunk<void, { cocktail: ICocktailMutation, token: string }>(
  'cocktails/addNewCocktail',
  async ({cocktail, token}) => {
    const formData = new FormData();

    const keys = Object.keys(cocktail) as (keyof ICocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktail[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/cocktails', formData, {headers: {'Authorization': token}});
  }
);

export const publishCocktail = createAsyncThunk(
  'cocktails/publishCocktail',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await axiosApi.patch(`/cocktails/${id}/togglePublished`);

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);
