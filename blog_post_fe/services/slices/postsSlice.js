import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  reFech: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsItems: (state, action) => {
      if (Array.isArray(action.payload)) {
        const newPosts = action.payload.filter(
          (newpost) =>
            !state.posts.some((existingPost) => existingPost.id === newpost.id)
        );
        state.posts = [...state.posts, ...newPosts];
      } else {
        state.posts = [...state.posts, action.payload];
      }
    },

    refechData: (state, action) => {
      state.reFech = true;
    },
  },
});
export const { setPostsItems, refechData } = postsSlice.actions;

export const selectPostsItmes = (state) => state.posts.posts;
export const selectRefetch = (state) => state.posts.reFech;

export default postsSlice.reducer;
