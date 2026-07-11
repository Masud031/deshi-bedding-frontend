import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartProduct, CartState } from "./cartTypes";

const initialState: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (state: CartState) => {
  state.totalQuantity = state.products.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.totalPrice = state.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartProduct>
    ) => {
      const existing = state.products.find(
        (item) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }

      calculateTotals(state);
    },

    removeFromCart: (
      state,
      action: PayloadAction<string>
    ) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );

      calculateTotals(state);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.products.find(
        (product) => product._id === action.payload
      );

      if (item) {
        item.quantity++;
      }

      calculateTotals(state);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.products.find(
        (product) => product._id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      // } else {
      //   state.products = state.products.filter(
      //     (product) => product._id !== action.payload
      //   );
      }

      calculateTotals(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;