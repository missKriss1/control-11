import { IItem, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchItems } from './ItemThunk.ts';
import { RootState } from '../../app/store.ts';

interface ItemState {
  item: IItem[];
  isFetching: boolean;
  isCreating: boolean;
  fetchingError: boolean;
  creatingError: ValidationError | null;
}

const initialState: ItemState = {
  item: [],
  isFetching: false,
  isCreating: false,
  fetchingError: false,
  creatingError: null,
};

export const selectItem = (state: RootState) => state.items.item;

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(fetchItems.fulfilled, (state, { payload: item }) => {
        state.isFetching = false;
        state.item = item;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      })
  }
})

export const itemReducer = itemSlice.reducer;