import { createFileRoute } from "@tanstack/react-router";
import ManageOrders from "@/components/dashboard/admin/ManageOrders";

export const Route = createFileRoute(
  "/dashboard/admin/Manage-Orders"
)({
  component: ManageOrdersPage,
});

function ManageOrdersPage() {
  return <ManageOrders />;
}