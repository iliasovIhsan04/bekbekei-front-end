import { createSlice } from "@reduxjs/toolkit";
import ActivationCode from "../../pages/ActivationCode";

const initialState = {
  code: null,
  error: null,
  loading: false,
  message: "",
};

const activationCode = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.code = action.payload;
      state.message = action.payload.message;
      state.phone = action.payload.phone;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } =
  ActivationCode.actions;

export const ActivationCode = (userData) => async (dispatch) => {};

export default activationCode.reducer;
