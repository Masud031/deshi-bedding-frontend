import Loading from "@/components/shared/Loading";
import { useGetOrdersByUserIdQuery } from "@/Redux/order/orderApi";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";


const UserPayments = () => {
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
  if (error) return <div className="p-4 text-red-500">Failed to load payments.</div>;

  const orders = Array.isArray(data?.data) ? data.data : [];

  const totalPayment = orders
    .reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0)
    .toFixed(2);

  return (
    <section className="p-4 max-w-3xl mx-auto">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment History
      </h2>

      {/* Total Summary */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-indigo-600">Total Spent</p>
        <p className="text-2xl font-bold text-indigo-700">
          ৳ {totalPayment}
        </p>
      </div>

      {/* Orders */}
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border p-4"
            >
              {/* Top row */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-800">
                    {order.orderId}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-red-100 text-red-700"
                      : order.status === "processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Amount:</span> ৳{" "}
                  {order.totalPrice}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserPayments;
