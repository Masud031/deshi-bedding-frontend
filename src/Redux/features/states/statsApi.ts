


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/baseurl";
import { AdminStatsData, UserStats } from "@/types/stats";


export const statsApi = createApi({
  reducerPath: "statsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/stats`,
    credentials: "include",
  }),

  tagTypes: ["Stats"],

  endpoints: (builder) => ({
    // User Dashboard Stats
    getUserStats: builder.query<UserStats, string>({
      query: (id) => ({
        url: `/user-stats/${id}`,
        method: "GET",
      }),

      providesTags: ["Stats"],
    }),

    // Admin Dashboard Stats
    getAdminStats: builder.query<AdminStatsData, void>({
      query: () => ({
        url: "/admin-stats",
        method: "GET",
      }),

      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetUserStatsQuery,
} = statsApi;