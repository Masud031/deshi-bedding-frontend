import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { statsApi } from "./features/states/statsApi";
import { productsApi } from "./products/productsApi";
import { uploadApi } from "./features/upload/uploadApi";
import cartReducer from "./cart/cartSlice";
import { orderApi } from "./order/orderApi";


export const store = configureStore({
  reducer: {
    auth: authReducer,
     cart: cartReducer,

    [authApi.reducerPath]: authApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      statsApi.middleware,
      uploadApi.middleware,
      orderApi.middleware,
    ),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;