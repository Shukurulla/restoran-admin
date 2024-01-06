import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    isLoading: false,
    musics: [],
  },
  reducers: {
    getMusicStart: (state) => {
      state.isLoading = true;
    },
    getMusicSuccess: (state, action) => {
      state.isLoading = false;
      state.musics = action.payload;
    },
    getMusicFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getMusicFailure, getMusicStart, getMusicSuccess } =
  musicSlice.actions;

export default musicSlice.reducer;
