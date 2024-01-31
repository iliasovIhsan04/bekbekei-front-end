import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../Api";
import { useNavigate } from "react-router";

export const forgotUser = createAsyncThunk(
  "phone/forgotUser",
  async (forgotCredentials) => {
    const request = await axios.post(
      url + "/auth/reset-password",
      forgotCredentials
    );
    const response = await request.data.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const forgorSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(forgotUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(forgotUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});
export default forgorSlice.reducer;
