import CheckoutPage from "@/components/checkout/checkoutpage";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});