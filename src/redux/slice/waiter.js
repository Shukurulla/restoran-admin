import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waiters: [],
  isLoading: false,
  error: null,
};

const waiterSlice = createSlice({
  name: "waiter",
  initialState,
  reducers: {
    getWaitersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getWaitersSuccess: (state, action) => {
      state.isLoading = false;
      state.waiters = action.payload;
    },
    getWaitersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getWaitersStart, getWaitersSuccess, getWaitersFailure } =
  waiterSlice.actions;
export default waiterSlice.reducer;
