import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItem } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchItems = createAsyncThunk<IItem[], void>(
  "items/fetchPosts",
  async () => {
    const response = await axiosApi.get<IItem[]>("/items");
    return response.data;
  },
);