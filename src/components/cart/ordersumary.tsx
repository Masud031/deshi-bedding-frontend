import { Link } from "@tanstack/react-router";

import { useSelector } from "react-redux";

import type { RootState } from "@/Redux/store";

export default function OrderSummary() {

  const {
    totalPrice,
    totalQuantity,
  } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="rounded-xl border p-6">

      <h2 className="mb-5 text-xl font-bold">
        Order Summary
      </h2>

      <div className="mb-3 flex justify-between">
        <span>Items</span>

        <span>{totalQuantity}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span>Subtotal</span>

        <span>৳{totalPrice}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span>Shipping</span>

        <span>Free</span>
      </div>

      <hr className="my-4" />

      <div className="mb-6 flex justify-between text-lg font-bold">

        <span>Total</span>

        <span>৳{totalPrice}</span>

      </div>

      <Link
        to="/checkout"
        className="block rounded-lg bg-primary py-3 text-center text-white"
      >
        Proceed To Checkout
      </Link>

    </div>
  );
}