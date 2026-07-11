import SingleProductPage from "@/pages/shop/SingleProductPage";
import { createFileRoute } from "@tanstack/react-router";
// import SingleProductPage from "@/components/shop/SingleProductPage";

export const Route = createFileRoute("/shop/$productId")({
  component: SingleProductPage,
});