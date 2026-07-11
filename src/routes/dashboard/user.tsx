import { createFileRoute } from "@tanstack/react-router";
import UserMain from "@/components/dashboard/user/UserMain";

export const Route = createFileRoute("/dashboard/user")({
  component: UserPage,
});

function UserPage() {
  return <UserMain />;
}