import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/api/apiSlice";
import categorySlice from "./services/slices/categorySlice";
import tokenSlice from "@/services/slices/tokenSlice";
import postsSlice from "./services/slices/postsSlice";
import userSlice from "./services/slices/userSlice";
import searchSlice from "./services/slices/searchSlice";
import closeControllerSlice from "./services/slices/closeControllerSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    token: tokenSlice,
    category: categorySlice,
    posts: postsSlice,
    user: userSlice,
    search: searchSlice,
    closeController: closeControllerSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
