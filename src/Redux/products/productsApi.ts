import { getBaseUrl } from '@/utils/baseurl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
  ProductResponse,
  Product,
  GetProductsParams,
  SingleProductResponse,
} from "./productTypes";



// masud
const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),
    tagTypes: ["Products"],
    endpoints: (builder) =>({

 getAllProducts: builder.query<
  ProductResponse,
  GetProductsParams | void
>({
  query: (args) => {
    const {
      category,
      color,
      priceMin,
      priceMax,
      page,
      limit,
      search,
      size,
      style,
      styleCategory,
    } = args ?? {};

    const params = new URLSearchParams();

    if (category && category !== "all")
      params.append("category", category);

    if (color && color !== "all")
      params.append("color", color);

    if (style)
      params.append("style", style);

    if (styleCategory)
      params.append("styleCategory", styleCategory);

    if (priceMin)
      params.append("priceMin", priceMin);

    if (priceMax)
      params.append("priceMax", priceMax);

    if (page)
      params.append("page", String(page));

    if (limit)
      params.append("limit", String(limit));

    if (search)
      params.append("search", search);

    if (size) {
      if (Array.isArray(size)) {
        params.append("size", size.join(","));
      } else {
        params.append("size", size);
      }
    }

    return {
      url: `/?${params.toString()}`,
    };
  },

  providesTags: ["Products"],
}),

getSingleProduct: builder.query<SingleProductResponse, string>({
  query: (id) => `/${id}`,
  providesTags: (result, error, id) => [
    { type: "Products", id },
  ],
}),
        
        fetchTrendingProducts: builder.query({
        query: () => `/trending`,
         providesTags: ["Products"],
        }),

        // search result//
        searchProducts: builder.query({
         query: (term) => `/search?search=${term}`, 
        providesTags: ["Products"],
      }),

        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product", 
                method: "POST",
                body: newProduct, 
                credentials: 'include'
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update-products/${id}`,
                method: "PATCH",
                body: rest,
            }),
            invalidatesTags: ["Products"]
        }),
       reduceStock: builder.mutation({
    query: ({ id, quantityOrdered,selectedSize }) => ({
        url: `/reduce-stock/${id}`,
        method: 'PATCH',
        body: { quantityOrdered,selectedSize },
    }),
    invalidatesTags: (result, error, { id }) => [{ type: "Products", id }] // ✅ This is the key
}),


        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{type:"Products", id }]
        }),
         // ✅ Releated with
   getAllFilters: builder.query({
  query: (category = 'all') => `/filters/${category}`,
}),

// subcategory filters //
getAllFilterProducts: builder.query({
  query: (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.category && filters.category !== "all") {
      params.append("category", filters.category);
    }

        if (filters.size?.length > 0) {
      if (Array.isArray(filters.size)) {
        params.append("size", filters.size.join(","));
      } else {
        params.append("size", filters.size);
      }
    }
    if (filters.color?.length) params.append("color", filters.color.join(","));
    if (filters.style?.length) params.append("style", filters.style.join(","));
    // style category
        if (filters.styleCategory?.length) {
      params.append("styleCategory", filters.styleCategory.join(","));
    }

  
if (filters.price) {
  if (filters.price.min !== undefined && filters.price.min !== null) {
    params.append("priceMin", filters.price.min);
  }

  if (filters.price.max !== undefined && filters.price.max !== null) {
    params.append("priceMax", filters.price.max);
  }
}

    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);
  
 console.log("Generated URL params:", params.toString());
 
    return `/filter?${params.toString()}`;
  },
  providesTags: ["Products"],
}),

 })
})

export const { 
useGetAllProductsQuery,
useGetSingleProductQuery,
useAddProductMutation,
useUpdateProductMutation,
useReduceStockMutation,
useDeleteProductMutation,
useFetchTrendingProductsQuery,
 useSearchProductsQuery,
  useGetAllFiltersQuery,
  useGetAllFilterProductsQuery
  } = productsApi;
export default productsApi