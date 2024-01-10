import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: {
    isLoading: false,
    calls: [],
  },
  reducers: {
    getCallStart: (state) => {
      state.isLoading = true;
    },
    getCallSuccess: (state, action) => {
      state.isLoading = false;
      state.calls = action.payload;
    },
    getCallFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getCallFailure, getCallStart, getCallSuccess } =
  callSlice.actions;
export default callSlice.reducer;
