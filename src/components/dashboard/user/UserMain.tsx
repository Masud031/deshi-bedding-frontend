import { useSelector } from "react-redux";
import {
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import type { RootState } from "@/Redux/store";
import { useGetUserStatsQuery } from "@/Redux/features/states/statsApi";

import Loading from "@/components/shared/Loading";
import UserStats from "./UserStats";
import { PurchaseInfo } from "@/types/stats";

// import type { PurchaseInfo } from "@/Redux/features/states/statsTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UserMain() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const skip = !user?._id;

  const {
    data: userData,
    isLoading,
    error,
  } = useGetUserStatsQuery(user?._id ?? "", {
    skip,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to fetch user statistics.
      </div>
    );
  }

  const stats = userData?.data;

  if (!stats) {
    return (
      <div className="p-6">
        No statistics available.
      </div>
    );
  }

  const {
    totalPayments,
    totalPurchadedProducts,
    totalReviews,
    purchaseInfo,
  } = stats;

  const chartData = {
    labels: [
      "Total Payments",
      "Total Reviews",
      "Purchased Products",
    ],
    datasets: [
      {
        label: "User Statistics",
        data: [
          totalPayments,
          totalReviews,
          totalPurchadedProducts,
        ],
        backgroundColor: [
          "rgba(255,99,132,.3)",
          "rgba(255,159,64,.3)",
          "rgba(255,205,86,.3)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(255,159,64,1)",
          "rgba(255,205,86,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.label === "Total Payments") {
              return `৳ ${context.raw}`;
            }

            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-800">
          User Dashboard
        </h1>

        <p className="mt-2 text-stone-500">
          Welcome back,
          <span className="ml-1 font-semibold text-amber-700">
            {user?.username}
          </span>
        </p>
      </div>

      <UserStats stats={stats} />

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Bar
          data={chartData}
          options={options}
        />
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          Purchase History
        </h2>

        {purchaseInfo.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {purchaseInfo.map(
              (order: PurchaseInfo) => (
                <div
                  key={order._id}
                  className="rounded-lg border p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-semibold">
                    {order.orderId}
                  </h3>

                  <p className="mt-2">
                    <strong>Total:</strong> ৳
                    {order.totalPrice}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod}
                  </p>

                  <p>
                    <strong>Status:</strong>

                    <span
                      className={`ml-2 font-medium ${
                        order.status ===
                        "pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500">
            No purchases found.
          </p>
        )}
      </div>
    </div>
  );
}