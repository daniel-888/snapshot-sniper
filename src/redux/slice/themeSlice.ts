import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  themeMode: string;
}

const initialState: ThemeState = {
  themeMode: (localStorage.getItem('snapshot-theme') === 'dark') ? 'dark' : 'light',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state: any, action: PayloadAction<null>) => {
      console.log('called toggleTheme')
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleTheme,
} = themeSlice.actions;

export default themeSlice.reducer;