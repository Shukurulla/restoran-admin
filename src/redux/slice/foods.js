import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  foods: [],
  error: "",
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    getFoodsStart: (state) => {
      state.isLoading = true;
    },
    getFoodsSuccess: (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
    },

    getFoodsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getFoodsFailure, getFoodsStart, getFoodsSuccess } =
  foodSlice.actions;

export default foodSlice.reducer;
