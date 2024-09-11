import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  signUpUser,
} from "../Actions/UserAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: "",
    message: "",
    secureCode: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.error = "";
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // sign up slice
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.secureCode = action.payload.secureCode;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.secureCode = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // me profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoading = false;
        state.error = "";
      })

      // logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null; // Clear user state on successful logout
        state.message = action.payload;
        state.error = ""; // Clear any errors
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload; // Handle error if logout fails
      })

      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
