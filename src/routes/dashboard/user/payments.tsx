import { createFileRoute } from "@tanstack/react-router";
import UserPayments from "@/components/dashboard/user/UserPayments";

export const Route = createFileRoute("/dashboard/user/payments")({
  component: UserPaymentsPage,
});

function UserPaymentsPage() {
  return <UserPayments />;
}