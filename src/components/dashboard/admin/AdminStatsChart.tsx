// import { useMemo } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import "chart.js/auto";

// import type { AdminStats } from "@/Redux/features/states/statsTypes";

// interface AdminStatsChartProps {
//   stats: AdminStats;
// }

// const AdminStatsChart = ({
//   stats,
// }: AdminStatsChartProps) => {
//   const pieData = useMemo(
//     () => ({
//       labels: [
//         "Total Orders",
//         "Total Products",
//         "Total Reviews",
//         "Total Users",
//       ],
//       datasets: [
//         {
//           label: "Admin Statistics",
//           data: [
//             stats.totalOrders,
//             stats.totalProducts,
//             stats.totalReviews,
//             stats.totalUsers,
//           ],
//           backgroundColor: [
//             "#FF6384",
//             "#36A2EB",
//             "#FFCE56",
//             "#4BC0C0",
//           ],
//           borderColor: [
//             "#FF6384",
//             "#36A2EB",
//             "#FFCE56",
//             "#4BC0C0",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     }),
//     [stats]
//   );

//   // Monthly Earnings Data
//   const monthlyData = new Array<number>(12).fill(0);

//   stats.monthlyEarnings.forEach((entry) => {
//     if (entry.month >= 1 && entry.month <= 12) {
//       monthlyData[entry.month - 1] = entry.earnings;
//     }
//   });

//   const lineData = {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ],
//     datasets: [
//       {
//         label: "Monthly Earnings",
//         data: monthlyData,
//         fill: false,
//         backgroundColor: "#36A2EB",
//         borderColor: "#36A2EB",
//         tension: 0.3,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="mt-10 space-y-8">
//       <h2 className="text-2xl font-semibold text-stone-800">
//         Admin Statistics Overview
//       </h2>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         {/* Pie Chart */}
//         <div className="h-96 rounded-xl border bg-white p-4 shadow-sm">
//           <Pie data={pieData} options={options} />
//         </div>

//         {/* Line Chart */}
//         <div className="h-96 rounded-xl border bg-white p-4 shadow-sm">
//           <Line data={lineData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStatsChart;