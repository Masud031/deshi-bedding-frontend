import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { statsApi } from "./features/states/statsApi";

import { uploadApi } from "./features/upload/uploadApi";
import cartReducer from "./cart/cartSlice";
import { orderApi } from "./order/orderApi";
import productsApi from "./products/productsApi";
import { reviewsApi } from "./features/reviews/reviewsApi";


export const store = configureStore({
  reducer: {
    auth: authReducer,
     cart: cartReducer,

    [authApi.reducerPath]: authApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
     [reviewsApi.reducerPath]:reviewsApi.reducer,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      statsApi.middleware,
      uploadApi.middleware,
      orderApi.middleware,
      reviewsApi.middleware,
    ),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;