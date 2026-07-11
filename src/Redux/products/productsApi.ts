import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "@/utils/baseurl";
import { ProductResponse, SingleProductResponse } from "./productTypes";



export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // Get All Products
    getAllProducts: builder.query<ProductResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),

      providesTags: ["Products"],
    }),

    // addproduct
    AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product", 
                method: "POST",
                body: newProduct, 
                credentials: 'include'
            }),
            invalidatesTags: ["Products"]
        }),

    // Get Single Product
    getSingleProduct: builder.query<
      SingleProductResponse,
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),

      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
} = productsApi;