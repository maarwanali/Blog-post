import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    deleteInput: (state, action) => initialState,
  },
});
export const { setInput, deleteInput } = searchSlice.actions;

export const selectSearch = (state) => state.search.input;

export default searchSlice.reducer;
