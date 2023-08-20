import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  close: {
    closeEditForm: false,
    closeAddPost: false,
    closeAddCategory: false,
  },
};

export const closeControllerSlice = createSlice({
  name: "closeController",
  initialState,
  reducers: {
    setCloseEditForm: (state, action) => {
      state.close.closeEditForm = !state.close.closeEditForm;
    },

    setCloseAddPost: (state, action) => {
      state.close.closeAddPost = !state.close.closeEditForm;
    },

    setCloseAddCategory: (state, action) => {
      state.close.closeAddCategory = !state.close.closeAddCategory;
    },
  },
});
export const { setCloseEditForm, setCloseAddPost, setCloseAddCategory } =
  closeControllerSlice.actions;

export const selectCloseEditForm = (state) =>
  state.closeController.close.closeEditForm;

export const selectCloseAddPost = (state) =>
  state.closeController.close.closeAddPost;
export const selectCloseAddCategory = (state) =>
  state.closeController.close.closeAddCategory;

export default closeControllerSlice.reducer;
