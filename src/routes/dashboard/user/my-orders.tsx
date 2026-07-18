import { createFileRoute } from "@tanstack/react-router";
import UserOrder from "@/components/dashboard/user/UserOrder";

export const Route = createFileRoute("/dashboard/user/my-orders")({
  component: UserOrdersPage,
});

function UserOrdersPage() {
  return <UserOrder />;
}