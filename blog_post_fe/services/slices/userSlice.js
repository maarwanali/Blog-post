import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    userId: "",
    username: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },

    deleteUser: (state, action) => {
      state.userData = initialState;
    },
  },
});
export const { setUser, deleteUser } = userSlice.actions;

export const selectUserDate = (state) => state.user.userData;

export default userSlice.reducer;
