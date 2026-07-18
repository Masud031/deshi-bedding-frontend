import { createFileRoute } from "@tanstack/react-router";

import AdminStats from "@/components/dashboard/admin/AdminStats";
import { useGetAdminStatsQuery } from "@/Redux/features/states/statsApi";

export const Route = createFileRoute("/dashboard/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data, isLoading, error } =
    useGetAdminStatsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load dashboard.</p>;
  }

  if (!data) {
    return <p>No data found.</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <AdminStats
        stats={data}
      />
    </div>
  );
}