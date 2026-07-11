import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "@/utils/baseurl";

import type {
  CreateOrderPayload,
  Order,
} from "./orderTypes";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/order`,
    credentials: "include",
  }),

  tagTypes: ["Order"],

  endpoints: (builder) => ({
    // Create Order
  createOrder: builder.mutation({
  query: (body) => ({
    url: "/order",
    method: "POST",
    body,
  }),

  invalidatesTags: ["Order"],
}),

    // User Orders
    getOrdersByUserId: builder.query<
      Order[],
      string
    >({
      query: (userId) => `user/id/${userId}`,

      providesTags: ["Order"],
    }),

    // Email Orders
    getOrdersByEmail: builder.query<
      Order[],
      string
    >({
      query: (email) =>
        `user/email/${encodeURIComponent(email)}`,

      providesTags: ["Order"],
    }),

    // Single Order
    getOrderById: builder.query<Order, string>({
      query: (orderId) => `/order/${orderId}`,

      providesTags: ["Order"],
    }),

    // Admin Orders
    getAllOrders: builder.query<Order[], void>({
      query: () => "/",

      providesTags: ["Order"],
    }),

    // Update Status
    updateOrderStatus: builder.mutation<
      Order,
      {
        id: string;
        status: string;
      }
    >({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Order"],
    }),

    // Delete Order
    deleteOrder: builder.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Order"],
    }),

    // Transaction
    getOrderByTransaction: builder.query<
      Order,
      string
    >({
      query: (transactionId) =>
        `/transaction/${transactionId}`,

      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersByUserIdQuery,
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetOrderByTransactionQuery,
} = orderApi;