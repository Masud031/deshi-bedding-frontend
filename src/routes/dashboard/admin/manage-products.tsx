import ManageProducts from "@/components/dashboard/admin/ManageProducts";
import { createFileRoute } from "@tanstack/react-router";



export const Route = createFileRoute(
  "/dashboard/admin/manage-products"
)({
  component: ManageProducts,
});