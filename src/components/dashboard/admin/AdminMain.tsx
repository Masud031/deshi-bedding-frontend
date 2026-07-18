import { useSelector } from "react-redux";

import type { RootState } from "@/Redux/store";

import { useGetAdminStatsQuery } from "@/Redux/features/states/statsApi";

import Loading from "@/components/shared/Loading";
import AdminStats from "./AdminStats";

export default function AdminMain() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    data,
    isLoading,
    error,
  } = useGetAdminStatsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to fetch admin statistics.
      </div>
    );
  }

  const stats = data;

  if (!stats) {
    return (
      <div className="p-6">
        No statistics available.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back,
          <span className="ml-1 font-semibold text-primary">
            {user?.username}
          </span>
        </p>
      </div>

      <AdminStats stats={stats} />

    </div>
  );
}