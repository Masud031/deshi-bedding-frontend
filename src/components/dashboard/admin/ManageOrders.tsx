/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Loading from "@/components/shared/Loading";
import { useDeleteOrderbyIdMutation, useGetAllOrdersQuery } from "@/Redux/order/orderApi";
import { showToast } from "@/utils/showToast";
import { Link } from "@tanstack/react-router";
import  { useState } from "react";
import UpdateOrderModal from "./UpdateOrderModal";



const ManageOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, error, refetch } = useGetAllOrdersQuery();
 

  const [deleteOrderbyId] = useDeleteOrderbyIdMutation();

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to fetch orders!</div>;

  const orders = data?.data ?? [];

  // 🔹 Filter orders
  const filteredOrders = !searchQuery
    ? orders
    : orders.filter((order:any) => {
        const q = searchQuery.toLowerCase();
        return (
          order.orderId?.toLowerCase().includes(q) ||
          order.fullName?.toLowerCase().includes(q) ||
          order.phone?.includes(q)
        );
      });

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteClick = async (orderId:any) => {
    try {
      await deleteOrderbyId(orderId).unwrap();
     showToast('success',`Deleted order ${orderId}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const handleView = (order:any) => {
     console.log("Selected order:", order);
    setSelectedOrder(order);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEdit = (order:any) => {
    setSelectedOrder(order);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setIsViewMode(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageSizeChange = (e:any) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <section className="section__container p-4 sm:p-6 mt-6">
      {/* 🔹 Header Controls */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold">Manage Orders</h2>

        {/* 🔹 Search */}
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Order ID, Name, or Phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>

        {/* 🔹 Page Size Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Show:
          </label>
          <select
            id="pageSize"
            value={itemsPerPage}
            onChange={handlePageSizeChange}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* 🔹 Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
            <tr>
              <th className="py-1 px-2 border-b text-left font-mono">Order ID</th>
              <th className="py-1 px-2 border-b text-left">Customer</th>
              <th className="py-1 px-2 border-b text-left">Phone</th>
              <th className="py-1 px-2 border-b text-left">Status</th>
              <th className="py-1 px-2 border-b text-left">Date</th>
              <th className="py-1 px-2 border-b text-left">Products</th>
              <th className="py-1 px-2 border-b text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map((order:any, index:any) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                <td className="py-1 px-2 border-b whitespace-nowrap font-mono">
                  {order.orderId}
                </td>
                <td className="py-1 px-2 border-b capitalize">
                  {order.fullName || "N/A"}
                </td>
                <td className="py-1 px-2 border-b">{order.phone || "—"}</td>
                <td className="py-1 px-2 border-b">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs text-white rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-1 px-2 border-b text-xs">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </td>

                {/* 🔹 Products Column */}
               <td className="py-1 px-2 border-b">
                    {order.products?.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {order.products.map((prd:any, i:any) => (
                       <Link
                        key={i}
                        to="/shop/$productId"
                        params={{ productId: prd.productId._id }}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 hover:underline"
                        >
                        {prd.productId.productCode}
                        <span className="ml-1 text-gray-500">
                            (x{prd.quantity})
                        </span>
                        </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No products</span>
                    )}
                  </td>

                {/* 🔹 Actions */}
                <td className="py-1 px-2 border-b flex items-center space-x-1 sm:space-x-2">
               <Link
                to="/dashboard/admin/$orderId"
                params={{ orderId: order._id }}
                className="text-blue-500 hover:underline"
                >
                View
                </Link>

                  <button
                    onClick={() => handleEdit(order)}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </button>

                  {/* <Link
                    to={`/dashboard/invoice/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Invoice
                  </Link> */}

                  <button
                    onClick={() => handleDeleteClick(order._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold transition ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-color-dark"
            }`}
          >
            Previous
          </button>

          {/* 🔹 Numbered Buttons */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition ${
                  page === currentPage
                    ? "bg-primary text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold transition ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-color-dark"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isViewMode={isViewMode}
        />
      )}
    </section>
  );
};

export default ManageOrders;

const getStatusColor = (status:any) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
};
