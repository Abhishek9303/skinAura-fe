"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { toast } from "react-toastify";

// Define a global filter component
function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="block w-full sm:inline-block mb-2 sm:mb-0">
      Search:{" "}
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-1 rounded"
        placeholder="Search orders..."
      />
    </span>
  );
}

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchOrderHistory = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${process.env.BACKEND_URL}api/v1/common/getOrder`,
        headers: {
          "auth-token": authToken,
        },
      };
      const res = await axios.request(config);
      if (res.data.status) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to retrieve order history.");
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Error fetching order history.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        method: "post",
        url: `${process.env.BACKEND_URL}api/v1/common/cancelOrder`,
        headers: {
          "auth-token": authToken,
        },
        data: { orderId },
      };
      const res = await axios.request(config);
      if (res.data.status) {
        toast.success("Order cancelled successfully.");
        fetchOrderHistory();
      } else {
        toast.error("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Error cancelling order.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: `${process.env.BACKEND_URL}api/v1/common/deleteOrder`,
        headers: {
          "auth-token": authToken,
        },
        data: { orderId },
      };
      const res = await axios.request(config);
      if (res.data.status) {
        toast.success("Order deleted successfully.");
        fetchOrderHistory();
      } else {
        toast.error("Failed to delete the order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order.");
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "productDetails.name",
        Cell: ({ row }) => (
          <Link href={`/products/${row.original.productDetails._id}`}>
            <p className="text-blue-500 hover:underline">
              {row.original.productDetails.name}
            </p>
          </Link>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() =>
                setExpandedRow(expandedRow === row.id ? null : row.id)
              }
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs cursor-pointer"
            >
              {expandedRow === row.id ? "Hide" : "View"}
            </button>
          </div>
        ),
      },
    ],
    [expandedRow]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: orders,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="w-full overflow-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="mb-4">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 border text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-2 sm:px-4 py-2 border"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
                {expandedRow === row.id && (
                  <tr>
                    <td colSpan={columns.length} className="p-4 border">
                      <div className="text-gray-700">
                        <p>
                          <strong>Order Date:</strong>{" "}
                          {new Date(
                            row.original.createdAt
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {row.original.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> $
                          {row.original.productDetails.price.toFixed(2)}
                        </p>
                        <p>
                          <strong>Status:</strong> {row.original.status}
                        </p>
                        <p>
                          <strong>Shipping Address:</strong>{" "}
                          {`${row.original.shippingAddress.addressLine1}, ${row.original.shippingAddress.city}, ${row.original.shippingAddress.state}, ${row.original.shippingAddress.country}, ${row.original.shippingAddress.pinCode}`}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleCancelOrder(row.original._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                            disabled={row.original.status === "Completed"}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
