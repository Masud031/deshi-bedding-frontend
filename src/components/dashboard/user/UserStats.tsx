// import type { UserStatsData } from "@/Redux/features/states/statsTypes";

import { UserStatsData } from "@/types/stats";

interface UserStatsProps {
  stats: UserStatsData;
}

export default function UserStats({
  stats,
}: UserStatsProps) {
  return (
    <div className="my-6">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Payments */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Total Payments
          </h2>

          <p className="mt-2 text-3xl font-bold text-green-600">
            ৳ {stats.totalPayments.toFixed(2)}
          </p>
        </div>

        {/* Total Reviews */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Total Reviews
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.totalReviews}
          </p>
        </div>

        {/* Purchased Products */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Purchased Products
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.totalPurchadedProducts}
          </p>
        </div>
      </div>
    </div>
  );
}