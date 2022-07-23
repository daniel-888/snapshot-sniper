import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CollectionState {
  all: any;
  popular: any;
  selectedSymbol: any;
}

const initialState: CollectionState = {
  all: ``,
  popular: '',
  selectedSymbol: ''
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setAllCollection: (state: any, action: PayloadAction<any>) => {
      state.all = action.payload;
    },
    setPopularCollection: (state: any, action: PayloadAction<any>) => {
      state.popular = action.payload;
    },
    setSelectedSymbol: (state: any, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllCollection,
  setPopularCollection,
  setSelectedSymbol
} = collectionSlice.actions;

export default collectionSlice.reducer;