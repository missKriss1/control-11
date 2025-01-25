import { ICategory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories } from './CategoryThunk.ts';
import { RootState } from '../../app/store.ts';

interface CategorySlice{
  category: ICategory[];
  loading: boolean;
  error: boolean
}
const initialState: CategorySlice = {
  category: [],
  loading: false,
  error: false,
}

export const selectCategory = (state: RootState) => state.categories.category;

const  categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllCategories.fulfilled, (state, { payload: categories }) => {
        state.loading = false;
        state.category = categories;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.error = true;
      });
  },
})

export const categoriesReducer = categorySlice.reducer;