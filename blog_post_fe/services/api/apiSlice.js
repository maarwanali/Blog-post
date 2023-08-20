import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setToken } from "../slices/tokenSlice";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (Headers, { getState }) => {
    const token = getState().token.authData.accessToken.accessToken;

    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }

    return Headers;
  },
});

// Mistakes
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let data = await baseQuery(args, api, extraOptions);
  console.log(data);

  if (data?.error?.status == 401) {
    const refreshToken = await baseQuery("auth/refresh", api, extraOptions);

    if (refreshToken?.data?.accessToken) {
      const accessToken = refreshToken.data.accessToken;
      api.dispatch(setToken({ accessToken }));
      data = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return data;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({}),
});
