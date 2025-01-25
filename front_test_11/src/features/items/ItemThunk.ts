import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItem, ValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchItems = createAsyncThunk<IItem[], void>(
  "items/fetchPosts",
  async () => {
    const response = await axiosApi.get<IItem[]>("/items");
    return response.data;
  },
);

export const fetchItemByCategory = createAsyncThunk <IItem[], string>(
  'items/fetchPostsByCategory',
  async (categoryId : string) =>{
    const {data: categoryByItem} = await axiosApi(`/items?category=${categoryId}`)
    return categoryByItem || [];
  }
)

export const addNewItem = createAsyncThunk<IItem, FormData, {state: RootState, rejectValue: ValidationError }>(
  'items/add',
  async (item: FormData, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;
    try {
      if (token) {
        const response = await axiosApi.post(`/items`, item, {
          headers: { Authorization: token },
        });
        return response.data;
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError );
      }

      throw e;
    }
  },
);