import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "myData",
  initialState: {
    data: [],
  },
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
    },
    allPromotions: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchDataSuccess } = mySlice.actions;
export const { allPromotions } = mySlice.actions;

export default mySlice.reducer;
