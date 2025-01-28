import { createSlice } from "@reduxjs/toolkit";

interface CollectionState {
  title: string;
  mainImg: string;
  code: number;
}

const initialState: CollectionState[] = [];

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
});

export const {} = collectionSlice.actions;

export default collectionSlice.reducer;
