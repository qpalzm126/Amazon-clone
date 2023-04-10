import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userdata: null,
  },
  reducers: {
    SET_USER: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const { SET_USER } = userSlice.actions;

export default userSlice.reducer;
