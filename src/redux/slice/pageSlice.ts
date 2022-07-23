import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state: any, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPage,
} = pageSlice.actions;

export default pageSlice.reducer;