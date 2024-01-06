import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  activePage: "Dashboard",
  unpaid: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.activePage = action.payload;
    },
    addUnpaid: (state, action) => {
      state.unpaid = action.payload;
    },
  },
});

export const { changePage, addUnpaid } = uiSlice.actions;

export default uiSlice.reducer;
