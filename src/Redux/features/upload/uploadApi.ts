import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "@/utils/baseurl";

interface UploadResponse {
  success: boolean;
  imageUrl: string;
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",

  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: "include",
  }),

  endpoints: (builder) => ({
    uploadImage: builder.mutation<
      UploadResponse,
      { image: string }
    >({
      query: (body) => ({
        url: "/api/uploadImage",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
} = uploadApi;