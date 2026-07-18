import { useParams } from "@tanstack/react-router";

export default function OrderDetailsPage() {
  const { orderId } = useParams({
    from: "/dashboard/admin/$orderId",
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order Details</h1>

      <p>Order ID: {orderId}</p>
    </div>
  );
}