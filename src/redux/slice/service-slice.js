import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    isLoading: false,
    services: [],
  },
  reducers: {
    getServicesStart: (state) => {
      state.isLoading = true;
    },
    getServiceSuccess: (state, action) => {
      state.isLoading = false;
      state.services = action.payload;
    },
  },
});

export const { getServiceSuccess, getServicesStart } = serviceSlice.actions;

export default serviceSlice.reducer;
