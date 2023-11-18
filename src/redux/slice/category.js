import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.isLoading = true;
    },
    getCategorySuccess: (state, action) => {
      state.isLoading = true;
      state.data = action.payload;
    },
  },
});

export const { getCategoryStart, getCategorySuccess } = categorySlice.actions;
export default categorySlice.reducer;
