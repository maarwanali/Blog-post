import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: {
    accessToken: "",
    isAuth: false,
  },
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.authData.accessToken = action.payload;
      state.authData.isAuth = true;
    },
    logOut: (state, action) => initialState,
  },
});
export const { setToken, logOut } = tokenSlice.actions;

export const selectAuthData = (state) => state.token.authData;

export default tokenSlice.reducer;
