import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  payments: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getPaymentsStart: (state) => {
      state.isLoading = true;
    },
    getPaymentsSuccess: (state, action) => {
      state.isLoading = false;
      state.payments = action.payload;
    },
    getPaymentsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getPaymentsFailure, getPaymentsStart, getPaymentsSuccess } =
  paymentSlice.actions;

export default paymentSlice.reducer;
