import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItem, IItemMutation, ValidationError } from '../../types';
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

export const addNewItem = createAsyncThunk<IItem,{itemMutation: IItemMutation}, {state: RootState; rejectValue: ValidationError}>(
  "items/addNewItem",
  async ({itemMutation}, {getState, rejectWithValue}) =>{
    const token = getState().users.user?.token;
    try{
      const formData = new FormData();
      const keys = Object.keys(itemMutation) as (keyof IItemMutation)[];

      keys.forEach((key) => {
        const value = itemMutation[key];

        if (value !== null) {
          formData.append(
            key,
            typeof value === "number" ? value.toString() : value
          );
        }
      });
      const response = await axiosApi.post<IItem>('/items', formData ,{
        headers: {Authorization: token}
      })

      return response.data;

    }catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
)