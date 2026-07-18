import OrderDetailsPage from "@/components/dashboard/admin/OrderDetailsPage";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/dashboard/admin/$orderId")({
  component: OrderDetailsPage,
});