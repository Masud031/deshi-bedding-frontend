import { useSelector } from "react-redux";


// import { useGetAdminStatsQuery } from "@/Redux/features/stats/statsApi";
import type { RootState } from "@/Redux/store";
import { useGetAdminStatsQuery } from "@/Redux/features/states/statsApi";
import Loading from "@/components/shared/Loading";
import AdminStats from "./AdminStats";


export default function AdminMain() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    data: stats,
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

  if (!stats) {
    return (
      <div className="p-6">
        No admin statistics available.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold text-stone-800">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-stone-500">
          Welcome back,{" "}
          <span className="font-semibold text-amber-700">
            {user?.username}
          </span>
        </p>
      </div>

      <AdminStats stats={stats} />

      {/* <AdminStatsChart stats={stats} /> */}

    </div>
  );
}