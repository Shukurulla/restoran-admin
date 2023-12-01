import { createSlice } from "@reduxjs/toolkit";

const debtSlice = createSlice({
  name: "debt",
  initialState: {
    isLoading: false,
    debt: [],
  },
  reducers: {
    getDebtStart: (state) => {
      state.isLoading = true;
    },
    getDebtSuccess: (state, action) => {
      state.isLoading = false;
      state.debt = action.payload;
    },
    getDebtFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getDebtFailure, getDebtStart, getDebtSuccess } =
  debtSlice.actions;

export default debtSlice.reducer;
