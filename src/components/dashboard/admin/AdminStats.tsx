import type { AdminStatsData } from "@/types/stats";

interface AdminStatsProps {
  stats: AdminStatsData;
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  const monthlyData = stats.monthlyEarnings ?? [];

  return (
    <div className="my-6">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Earnings */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Total Earnings
          </h2>

          <p className="mt-2 text-3xl font-bold text-green-600">
            ৳ {stats.totalEarnings.toFixed(2)}
          </p>
        </div>

        {/* Orders */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Total Orders
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.totalOrders}
          </p>
        </div>

        {/* Users */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Total Users
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.totalUsers}
          </p>
        </div>

        {/* Products */}
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-500">
            Total Products
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {stats.totalProducts}
          </p>
        </div>
      </div>

      {/* Monthly Earnings */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Monthly Earnings
        </h2>

        {monthlyData.length > 0 ? (
          <div className="space-y-2">
            {monthlyData.map((item) => (
              <div
                key={`${item.month}-${item.year}`}
                className="flex items-center justify-between border-b pb-2 last:border-none"
              >
                <span>
                  {item.month}/{item.year}
                </span>

                <span className="font-semibold text-green-600">
                  ৳ {item.earnings.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No earnings data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminStats;