import { IItem, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addNewItem, fetchItemByCategory, fetchItems } from './ItemThunk.ts';
import { RootState } from '../../app/store.ts';

interface ItemState {
  item: IItem[];
  loading: boolean;
  addLoading: boolean;
  error: boolean;
  addError: ValidationError | null;
}

const initialState: ItemState = {
  item: [],
  loading: false,
  addLoading: false,
  error: false,
  addError: null,
};

export const selectItem = (state: RootState) => state.items.item;
export const addError = (state: RootState) => state.items.addError;
export const addLoading = (state: RootState) => state.items.addLoading;

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchItems.fulfilled, (state, { payload: item }) => {
        state.loading = false;
        state.item = item;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addNewItem.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addNewItem.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addNewItem.rejected, (state, { payload: error }) => {
        state.addError = error || null;
      })
      .addCase(fetchItemByCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchItemByCategory.fulfilled, (state, { payload: item }) => {
        state.loading = false;
        state.item = item
      })
      .addCase(fetchItemByCategory.rejected, (state) => {
        state.error = true;
      })
  }
})

export const itemReducer = itemSlice.reducer;