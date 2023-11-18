import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  activePage: "Dashboard",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { changePage } = uiSlice.actions;

export default uiSlice.reducer;
