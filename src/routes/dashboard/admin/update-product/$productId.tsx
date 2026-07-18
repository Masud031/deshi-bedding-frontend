import { createFileRoute } from "@tanstack/react-router";
import UpdateProduct from "@/components/dashboard/admin/UpdateProduct";

export const Route = createFileRoute(
  "/dashboard/admin/update-product/$productId"
)({
  component: UpdateProduct,
});