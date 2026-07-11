import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/Redux/store";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/ordersumary";

// import CartItem from "@/components/cart/CartItem";
// import OrderSummary from "@/components/cart/OrderSummary";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const products = useSelector(
    (state: RootState) => state.cart.products
  );

  return (
    <section className="container mx-auto py-10 px-4">

      <h1 className="mb-8 text-3xl font-bold">
        Shopping Cart
      </h1>

      {products.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="text-xl font-semibold">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products to your cart.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2 space-y-4">
            {products.map((item) => (
              <CartItem
                key={`${item._id}-${item.selectedSize}`}
                item={item}
              />
            ))}
          </div>

          <OrderSummary />

        </div>
      )}

    </section>
  );
}