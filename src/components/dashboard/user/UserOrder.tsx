import Loading from "@/components/shared/Loading";
import { useGetOrdersByUserIdQuery } from "@/Redux/order/orderApi";
import { RootState } from "@/Redux/store";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";


const UserOrders = () => {
  const { user } = useSelector(
  (state: RootState) => state.auth
);

const skip = !user?._id;
const {
  data,
  isLoading,
  error,
} = useGetOrdersByUserIdQuery(user?._id ?? "", {
  skip,
});

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to load orders.</div>;

  const orders = data?.data || [];

  const statusStyle = (status:any) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">Your Orders</h2>

      {/* =================== DESKTOP TABLE =================== */}
      <div className="hidden md:block bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order:any, index:any) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">৳ {order.totalPrice}</td>
                <td className="p-3">
                 <Link
                to="/dashboard/admin/$orderId"
                params={{ orderId: order._id }}
                className="text-primary underline"
                >
                View
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =================== MOBILE CARDS =================== */}
      <div className="md:hidden space-y-4">
        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found.</p>
        )}

        {orders.map((order:any) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow p-4 space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Order ID</span>
              <span className="text-sm">{order.orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm font-semibold">Date</span>
              <span className="text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Status</span>
              <span
                className={`px-2 py-1 rounded text-xs ${statusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-sm font-bold">৳ {order.totalPrice}</span>
            </div>

           <Link
            to="/dashboard/admin/$orderId"
            params={{ orderId: order._id }}
            className="block text-center mt-3 py-2 bg-primary text-white rounded"
            >
            View Order
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserOrders;
