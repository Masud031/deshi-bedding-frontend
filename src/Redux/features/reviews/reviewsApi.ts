import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/baseurl";

import type {
  ReviewResponse,
  ReviewsCountResponse,
  CreateReviewPayload,
} from "./reviewTypes";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),

  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    postAReview: builder.mutation<
      void,
      CreateReviewPayload
    >({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),

      invalidatesTags: (_result, _error, arg) => [
        {
          type: "Reviews",
          id: arg.productId,
        },
      ],
    }),

    getReviewsCount: builder.query<
      ReviewsCountResponse,
      void
    >({
      query: () => "/total-reviews",
    }),

    getReviewByUserId: builder.query<
      ReviewResponse,
      string
    >({
      query: (id) => `/${id}`,

      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  usePostAReviewMutation,
  useGetReviewByUserIdQuery,
  useGetReviewsCountQuery,
} = reviewsApi;