"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { toast } from "react-toastify";

// Define a global filter component
function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="block sm:inline-block mb-2 sm:mb-0">
      Search:{" "}
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-1 rounded w-full sm:w-auto"
        placeholder="Search orders..."
      />
    </span>
  );
}

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        url: `${process.env.BACKEND_URL}api/v1/common/cancelOrder`, // Update with the actual cancel order endpoint
        headers: {
          "auth-token": authToken,
        },
        data: { orderId },
      };
      const res = await axios.request(config);
      if (res.data.status) {
        toast.success("Order cancelled successfully.");
        fetchOrderHistory(); // Refresh order history after cancellation
      } else {
        toast.error("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Error cancelling order.");
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
        Header: "Order Date",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Price",
        accessor: "productDetails.price",
        Cell: ({ value }) => `${value.toFixed(2)}`,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Shipping Address",
        accessor: "shippingAddress",
        Cell: ({ value }) =>
          `${value.addressLine1}, ${value.city}, ${value.state}, ${value.country}, ${value.pinCode}`,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) =>
          ["Processing", "Pending"].includes(row.original.status) ? (
            <button
              onClick={() => handleCancelOrder(row.original._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          ) : (
            <span className="text-gray-500">N/A</span>
          ),
      },
    ],
    []
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
    useGlobalFilter, // Use global filter hook
    useSortBy // Use sorting hook
  );

  const { globalFilter } = state;

  if (loading) {
    return <p className="text-center py-10">Loading order history...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-10">No orders found.</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto p-5">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Order History
      </h2>
      <div className="flex justify-between mb-4 flex-col sm:flex-row items-center">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300 text-sm sm:text-base"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-2 sm:px-4 py-2 border text-left"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
