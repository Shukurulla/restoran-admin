import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrdersStart: (state) => {
      state.isLoading = true;
    },
    getOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    getOrdersFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getOrdersFailure, getOrdersStart, getOrdersSuccess } =
  orderSlice.actions;

export default orderSlice.reducer;
