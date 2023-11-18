import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  dosage: [],
};

const dosageSlice = createSlice({
  name: "dosage",
  initialState,
  reducers: {
    getDosageStart: (state) => {
      state.isLoading = true;
    },
    getDosageSuccess: (state, action) => {
      state.isLoading = false;
      state.dosage = action.payload;
    },
    getDosageFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getDosageFailure, getDosageStart, getDosageSuccess } =
  dosageSlice.actions;

export default dosageSlice.reducer;
