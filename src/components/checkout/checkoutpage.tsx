import { useState } from "react";

import ShippingForm, {
  ShippingData,
} from "./ShippingForm";
import PaymentMethod from "./paymntMethod";
import OrderSummary from "../cart/ordersumary";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "@/Redux/order/orderApi";
import { AppDispatch, RootState } from "@/Redux/store";
import { useNavigate } from "@tanstack/react-router";
import Swal from "sweetalert2";
import { clearCart } from "@/Redux/cart/cartSlice";



export default function CheckoutPage() {
  const [shipping, setShipping] =
    useState<ShippingData>({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      district: "",
      notes: "",
    });

 const navigate = useNavigate();   
 const dispatch = useDispatch<AppDispatch>();

  const { products, totalPrice } = useSelector(
  (state: RootState) => state.cart
);

const [createOrder, { isLoading }] =
  useCreateOrderMutation();

// payment//
  const [payment, setPayment] =
    useState("cod");

// handle order//
const handleOrder = async () => {
  try {
    const payload = {
      fullName: shipping.fullName,
      address: shipping.address,
      district: shipping.district,
      zipCode: "",
      phone: shipping.phone,

      paymentMethod: payment,

      totalPrice,

      deliveryMethod: "Home Delivery",

      deliveryStatus: "pending",

      paymentStatus:
        payment === "cod"
          ? "pending"
          : "paid",

      products: products.map((item) => ({
        productId: item._id,

        productCode: item.productCode,

        name: item.name,

        category: item.category,

        color: item.color ?? "",

        image: item.image,

        size: item.selectedSize ?? "Default",

        quantity: item.quantity,

        price: item.price,

        totalPrice: item.price * item.quantity,
      })),
    };

    const res = await createOrder(payload).unwrap();

    console.log(res);

    // Clear cart
    dispatch(clearCart());

    // Success Alert
    await Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      html: `
        <p>Thank you for shopping with <b>Deshi Bedding</b>.</p>
        <br/>
        <strong>Order ID:</strong> ${res.order?.orderId ?? "N/A"}
      `,
      confirmButtonText: "Continue Shopping",
      confirmButtonColor: "#b45309",
    });

    // Redirect to Shop
    navigate({
      to: "/shop",
    });

  } catch (err: any) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Order Failed",
      text:
        err?.data?.message ||
        "Something went wrong. Please try again.",
      confirmButtonColor: "#dc2626",
    });
  }
};

  return (
    <section className="container mx-auto py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <ShippingForm
            value={shipping}
            onChange={setShipping}
          />

          <PaymentMethod
            value={payment}
            onChange={setPayment}
          />

        </div>

        <div>

          <OrderSummary />

        <button
  onClick={handleOrder}
  disabled={isLoading}
  className="mt-6 w-full rounded-lg bg-primary py-4 font-semibold text-white"
>
  {isLoading ? "Placing Order..." : "Place Order"}
</button>

        </div>

      </div>

    </section>
  );
}