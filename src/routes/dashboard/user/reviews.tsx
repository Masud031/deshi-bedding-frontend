import UserReviews from "@/components/dashboard/user/UserReviews";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/user/reviews")({
  component: UserReviewsPage,
});

function UserReviewsPage() {
  return <UserReviews />;
}