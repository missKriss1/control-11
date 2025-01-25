import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAllCategories = createAsyncThunk<ICategory[]>(
  'categories/fetchAllCategories',
  async () => {
    const {data: category} = await axiosApi.get('/categories');
    return category || [];
  }
)