import { apiSlice } from "./apiSlice";

export const reqHandler = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),

    register: build.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logOut: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),

    refresh: build.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
    getAllUsers: build.mutation({
      query: () => ({
        url: "auth/users",
        method: "GET",
      }),
    }),
    editUSerRole: build.mutation({
      query: (data) => ({
        url: `auth/edit-user/${data.userId}`,
        method: "PUT",
        body: data.body,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `auth/delete-user/${id}`,
        method: "DELETE",
      }),
    }),
    getPosts: build.mutation({
      query: (page) => ({
        url: `post/?page=${page}`,
        method: "GET",
      }),
    }),
    addPost: build.mutation({
      query: (data) => ({
        url: "post/add",
        method: "POST",
        body: data,
      }),
    }),
    getPostsByCategory: build.mutation({
      query: (body) => ({
        url: `post/by-category/${body.categoryId}/?page=${body.page}`,
        method: "GET",
      }),
    }),

    getPostsProfile: build.mutation({
      query: () => ({
        url: "post/profile",
        method: "GET",
      }),
    }),
    deletePastByAdmin: build.mutation({
      query: (id) => ({
        url: `post/admin/${id}`,
        method: "DELETE",
      }),
    }),

    deletePost: build.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "DELETE",
      }),
    }),

    editPost: build.mutation({
      query: (data) => ({
        url: `post/${data.postId}`,
        method: "PUT",
        body: data.body,
      }),
    }),

    getCategories: build.mutation({
      query: () => ({
        url: "category",
        method: "GET",
      }),
    }),

    addCategory: build.mutation({
      query: (data) => ({
        url: "category/add",
        method: "POST",
        body: data,
      }),
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
    }),
    addComment: build.mutation({
      query: (data) => ({
        url: "comment/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useRegisterMutation,
  useLogOutMutation,
  useRefreshMutation,
  useGetAllUsersMutation,
  useEditUSerRoleMutation,
  useDeleteUserMutation,
  useGetPostsMutation,
  useAddPostMutation,
  useGetPostsByCategoryMutation,
  useGetPostsProfileMutation,
  useDeletePostMutation,
  useDeletePastByAdminMutation,
  useEditPostMutation,
  useGetCategoriesMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useAddCommentMutation,
} = reqHandler;
