import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: "",
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },

    setCategoriesItems: (state, action) => {
      console.log(action.payload);

      if (Array.isArray(action.payload)) {
        const newCategories = action.payload.filter(
          (newCategory) =>
            !state.categories.some(
              (existingCategory) => existingCategory.id === newCategory.id
            )
        );
        state.categories = [...state.categories, ...newCategories];
      } else {
        state.categories = [...state.categories, action.payload];
      }
    },
  },
});
export const { setCategory, setCategoriesItems } = categorySlice.actions;

export const selectCategory = (state) => state.category.categoryId;
export const selectCategoriesItems = (state) => state.category.categories;

export default categorySlice.reducer;
