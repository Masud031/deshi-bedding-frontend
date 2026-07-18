import { createFileRoute } from "@tanstack/react-router";
import ManageUsers from "@/components/dashboard/admin/ManageUsers";

export const Route = createFileRoute(
  "/dashboard/admin/manage-users"
)({
  component: ManageUsersPage,
});

function ManageUsersPage() {
  return <ManageUsers />;
}