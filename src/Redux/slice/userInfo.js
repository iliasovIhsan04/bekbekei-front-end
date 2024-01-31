import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
  name: "myData",
  initialState: {
    user: [],
  },
  reducers: {
    authUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { authUser } = userInfo.actions;

export default userInfo.reducer;
