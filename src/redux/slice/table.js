import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  tables: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    getTableStart: (state) => {
      state.isLoading = true;
    },
    getTableSuccess: (state, action) => {
      state.isLoading = false;
      state.tables = action.payload;
    },
    getTableFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getTableFailure, getTableStart, getTableSuccess } =
  tableSlice.actions;
export default tableSlice.reducer;
