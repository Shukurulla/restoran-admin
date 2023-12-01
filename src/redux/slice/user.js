import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipAddress: null,
  device: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addIpAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    addDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { addDevice, addIpAddress } = userSlice.actions;

export default userSlice.reducer;
