import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    isLoading: false,
    saved: [],
  },
  reducers: {
    getSavedStart: (state) => {
      state.isLoading = true;
    },
    getSavedSuccess: (state, action) => {
      state.isLoading = false;
      state.saved = action.payload;
    },
    getSavedFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getSavedFailure, getSavedStart, getSavedSuccess } =
  savedSlice.actions;

export default savedSlice.reducer;
