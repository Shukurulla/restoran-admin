import { createSlice } from "@reduxjs/toolkit";

const tradeTableSlice = createSlice({
  name: "trade-table",
  initialState: {
    isLoading: false,
    tradeTables: [],
  },
  reducers: {
    getTradeTableStart: (state) => {
      state.isLoading = true;
    },
    getTradeTableSuccess: (state, action) => {
      state.isLoading = false;
      state.tradeTables = action.payload;
    },
    getTradeTableFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getTradeTableFailure,
  getTradeTableStart,
  getTradeTableSuccess,
} = tradeTableSlice.actions;

export default tradeTableSlice.reducer;
